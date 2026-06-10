#!/usr/bin/env node
/**
 * Generates one branded One Tap Alert "poster" per run: Claude writes a short
 * personal-safety tip, we render it into an on-brand 1080x1350 image with
 * satori + resvg, upload it to imgbb (free host -> public URL Instagram needs),
 * and post it to a Facebook Page and Instagram via the Meta Graph API.
 *
 * Env:
 *   ANTHROPIC_API_KEY   (required) - writes the tip + caption
 *   CLAUDE_MODEL        (optional, default claude-sonnet-4-6)
 *   PEXELS_API_KEY      (optional) - real photo for the header (gradient fallback)
 *   IMGBB_API_KEY       (required to post) - free image host, https://api.imgbb.com
 *   META_ACCESS_TOKEN   (required to post)
 *   META_PAGE_ID        (optional) - enables Facebook
 *   META_IG_USER_ID     (optional) - enables Instagram
 *   META_GRAPH_VERSION  (optional, default v21.0)
 *
 * Usage:
 *   node scripts/generate-poster.mjs              # render, upload, post
 *   node scripts/generate-poster.mjs --dry-run    # render to scripts/.preview-poster.png, do NOT upload/post
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import QRCode from "qrcode";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontsDir = path.join(root, "scripts", "assets", "fonts");
const historyPath = path.join(root, "content", "poster-history.json");

const apiKey = process.env.ANTHROPIC_API_KEY;
const model = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";

// Stub content for `--mock` local render tests (no Claude call needed).
const MOCK_CONTENT = {
  category: "Safety Tip",
  headline: "Share Your Location Tonight",
  tip: "Heading out after dark? Share live location with someone you trust before you leave — peace of mind in one tap.",
  imageQuery: "city street night",
  caption:
    "Heading out tonight? A little planning goes a long way. Share your live location and set a Safety Timer so someone always has your back.",
  hashtags: ["#OneTapAlert", "#PersonalSafety", "#StaySafe", "#SafetyTips", "#USA"],
};
const graphVersion = process.env.META_GRAPH_VERSION || "v21.0";
const dryRun = process.argv.includes("--dry-run");
const mock = process.argv.includes("--mock"); // local render test: skip the Claude call

// Where the poster's QR codes + caption links point (both app stores).
const APP_STORE_URL = "https://apps.apple.com/us/app/one-tap-alert/id6758563344";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.despia.onetapalert";

// Rotating safety pillars, weighted toward the people One Tap Alert most serves:
// women alone, night/shift workers, online daters & anyone meeting strangers,
// independent workers who meet clients alone, older adults & people living alone,
// and anyone going through a lonely/low stretch who wants someone checking in.
const PILLARS = [
  "a personal-safety tip for women walking or commuting alone",
  "staying safe on a late shift and the walk to your car at night",
  "how a Safety Timer protects you on a first date or meeting someone from an app",
  "smart safety steps and red flags when meeting a stranger in person",
  "staying safe when you meet clients or strangers alone for work",
  "how independent workers can quietly share live location on the job",
  "safety and daily check-ins for an older parent living alone",
  "staying safe and connected when you live by yourself",
  "a gentle check-in habit for someone going through a lonely, hard time",
  "how emergency contacts and check-ins help when you feel low or isolated",
  "discreet ways to call for help without alerting someone nearby",
  "setting up a trusted circle who always know where you are",
  "why a one-tap SOS beats fumbling for your phone in a scary moment",
  "a 10-second safety habit before you head out alone tonight",
  "safety for night-shift and healthcare workers heading home late",
  "building a simple safety plan if you often feel unsafe",
];

// US metros to localize roughly half the posters for American local discovery.
const US_CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "Austin", "Seattle", "Denver",
  "Atlanta", "Miami", "Boston", "Nashville", "Portland", "Las Vegas",
  "Charlotte", "Minneapolis",
];

// Curated Unsplash photo IDs (people / city / street / travel / safety themes).
// These are direct CDN URLs that need NO API key, so the poster ALWAYS has a real
// photo header even when PEXELS_API_KEY isn't set. (Pexels, when keyed, is still
// preferred because it matches each tip's imageQuery.)
const UNSPLASH_POOL = [
  "photo-1519608487953-e999c86e7455", "photo-1488161628813-04466f872be2",
  "photo-1514933651103-005eec06c04b", "photo-1502920917128-1aa500764cbd",
  "photo-1490806843957-31f4c9a91c65", "photo-1444723121867-7a241cacace9",
  "photo-1480714378408-67cf0d13bc1b", "photo-1506521781263-d8422e82f27a",
  "photo-1469854523086-cc02fe5d8800", "photo-1436491865332-7a61a109cc05",
  "photo-1551632811-561732d1e306", "photo-1507525428034-b723cf961d3e",
  "photo-1533174072545-7a4b6ad7a6c3", "photo-1516321318423-f06f85e504b3",
  "photo-1584515933487-779824d29309", "photo-1494790108377-be9c29b29330",
  "photo-1517841905240-472988babdf9",
];

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found in model output.");
  return JSON.parse(candidate.slice(start, end + 1));
}

async function loadHistory() {
  try {
    return JSON.parse(await readFile(historyPath, "utf8"));
  } catch {
    return [];
  }
}

async function writeContent(history) {
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set. Add it as a GitHub Actions secret.");
  const recent = history.slice(-40).map((h) => `- ${h.headline}`).join("\n") || "- (none yet)";
  const pillar = PILLARS[history.length % PILLARS.length];
  // Localize roughly half the posters to a US city for American local discovery.
  const city = history.length % 2 === 0 ? US_CITIES[history.length % US_CITIES.length] : null;

  const system =
    "You write punchy, reassuring social media graphics for One Tap Alert (onetapalert.com) - a " +
    "personal-safety SOS app for iPhone and Android. It offers a one-tap SOS button that alerts your emergency " +
    "contacts with your live location, real-time location sharing, a Safety Timer (set a countdown " +
    "for an activity; if you don't check in, contacts are auto-alerted), an encrypted vault, and " +
    "unlimited emergency contacts. Tone is calm, empowering and genuinely useful - never " +
    "fear-mongering. It especially speaks to the people most at risk when they're alone: women " +
    "walking or commuting solo, late-night and shift workers, anyone meeting someone new from a " +
    "dating app or meeting clients alone for work, older adults and people who live by themselves, " +
    "and people going through a lonely or low stretch who'd feel safer knowing someone is checking " +
    "in. Be inclusive, respectful and non-judgmental; if a tip touches on feeling unsafe, isolated " +
    "or in crisis, keep it warm and, when it fits naturally, note that help is there (in the US you " +
    "can call or text 988). Write for a UNITED STATES audience: American English spelling and idioms, " +
    "US references, dollars ($). You ALWAYS respond with a single valid JSON object and nothing else.";

  const prompt = `Create the text for ONE daily One Tap Alert poster (a designed graphic with a short safety tip).

Theme for today: "${pillar}". Pick a fresh, specific angle.
${city ? `Localize today's poster to ${city}, USA — mention ${city} naturally in the tip, and use it in the imageQuery (e.g. "${city} street night"). Add a #${city.replace(/\s+/g, "")} hashtag.` : "Keep today's poster general to the US (no specific city)."}

Do NOT repeat or closely overlap any of these recent headlines:
${recent}

Return ONLY a JSON object with EXACTLY these fields:
{
  "category": "2-3 word kicker in Title Case, e.g. 'Safety Tip', 'Did You Know?', 'Stay Safe', 'Be Prepared'",
  "headline": "punchy hook, MAX 38 characters, Title Case, no period",
  "tip": "1-2 calm, useful sentences expanding the headline, MAX 170 characters",
  "imageQuery": "2-3 word search term for a REAL photo fitting the tip, e.g. 'woman walking night', 'city street evening', 'person hiking trail', 'student campus walking'",
  "caption": "social caption WITHOUT hashtags and WITHOUT any URL, 2-3 reassuring sentences. Naturally work in One Tap Alert's value: personal safety made simple — a one-tap SOS, live location sharing, and a Safety Timer that watches your back. Empowering, never scary. Vary the wording each time.",
  "hashtags": ["#OneTapAlert", "#... 3-6 descriptive + brand safety tags (e.g. #PersonalSafety #SafetyFirst #StaySafe #SafetyTips #SOS #EmergencyPreparedness #SafetyApp), AND include one US-geo tag (#USA, or the city tag if a city was given above)."]
}

Rotate between everyday safety, travel, students, seniors, and emergency prep across days. Keep the headline SHORT so it fits the poster.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model, max_tokens: 1000, system, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Claude API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const out = extractJson((data.content || []).map((b) => b.text || "").join(""));
  if (!out.headline || !out.tip) throw new Error("Model did not return headline/tip.");
  out.category = (out.category || "Safety Tip").trim();
  out.headline = out.headline.trim();
  out.tip = out.tip.trim();
  return out;
}

// ---- Poster rendering (satori -> SVG -> resvg -> PNG) -----------------------

function box(style, children) {
  return { type: "div", props: { style: { display: "flex", ...style }, children } };
}

// A single white QR card with a store label underneath.
function qrCard(dataUri, label) {
  return box({ flexDirection: "column", alignItems: "center" }, [
    box({ backgroundColor: "#ffffff", padding: 12, borderRadius: 18 }, [
      { type: "img", props: { src: dataUri, width: 150, height: 150 } },
    ]),
    box({ height: 8 }, []),
    box({ fontSize: 23, fontWeight: 600, color: "rgba(255,255,255,0.85)" }, label),
  ]);
}

// One Tap Alert brand palette (from the blog's tailwind theme).
const INK = "#1A2E1A"; // deep green-black panel (ota.dark)
const GREEN = "#4A7C59"; // primary brand green
const GREEN_DEEP = "#2D5A3D";

/**
 * Fetch a relevant real photo from Pexels and return it as a base64 data URI
 * (satori needs the image inline). Returns null if no key / no result, so the
 * poster falls back to a clean gradient header.
 */
async function fetchPhotoDataUri(query, variety) {
  const key = process.env.PEXELS_API_KEY;
  if (!key || !query) return null;
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
      { headers: { Authorization: key } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const photos = Array.isArray(data.photos) ? data.photos : [];
    if (!photos.length) return null;
    const photo = photos[variety % photos.length];
    const src = photo.src?.landscape || photo.src?.large2x || photo.src?.large || photo.src?.original;
    if (!src) return null;
    const imgRes = await fetch(src);
    if (!imgRes.ok) return null;
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const ct = imgRes.headers.get("content-type") || "image/jpeg";
    return `data:${ct};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * No-key photo fallback: pull a real photo from the curated Unsplash pool (direct
 * CDN, no API key) so the poster header is never an empty gradient. Rotates by
 * index so the photo varies day to day. Returns a base64 data URI for satori.
 */
async function fetchUnsplashDataUri(index) {
  const id = UNSPLASH_POOL[index % UNSPLASH_POOL.length];
  try {
    const res = await fetch(`https://images.unsplash.com/${id}?w=1080&h=520&fit=crop&q=80`);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") || "image/jpeg";
    return `data:${ct};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

async function renderPoster({ category, headline, tip, photoDataUri, appleQr, androidQr }) {
  const [bold, semi, regular] = await Promise.all([
    readFile(path.join(fontsDir, "Poppins-Bold.ttf")),
    readFile(path.join(fontsDir, "Poppins-SemiBold.ttf")),
    readFile(path.join(fontsDir, "Poppins-Regular.ttf")),
  ]);

  const PHOTO_H = 500;
  const header = photoDataUri
    ? { type: "img", props: { src: photoDataUri, width: 1080, height: PHOTO_H, style: { objectFit: "cover" } } }
    : box({ width: 1080, height: PHOTO_H, backgroundImage: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DEEP} 100%)` }, []);

  // Two QR codes side by side: Apple App Store + Google Play.
  const qrRow = box({ flexDirection: "row", alignItems: "flex-end" }, [
    qrCard(appleQr, "App Store"),
    box({ width: 22 }, []),
    qrCard(androidQr, "Google Play"),
  ]);

  const tree = box(
    { width: 1080, height: 1350, flexDirection: "column", backgroundColor: INK, fontFamily: "Poppins", color: "white" },
    [
      // photo header with category pill + gradient blend into the panel below
      box({ width: 1080, height: PHOTO_H, position: "relative" }, [
        header,
        box({ position: "absolute", top: 42, left: 56 }, [
          box(
            { backgroundColor: GREEN, color: "#ffffff", fontWeight: 700, fontSize: 28, letterSpacing: 2, padding: "14px 30px", borderRadius: 999 },
            category.toUpperCase(),
          ),
        ]),
        box({ position: "absolute", bottom: 0, left: 0, width: 1080, height: 200, backgroundImage: `linear-gradient(to bottom, rgba(26,46,26,0) 0%, ${INK} 100%)` }, []),
      ]),
      // text panel
      box({ flexGrow: 1, flexDirection: "column", justifyContent: "space-between", padding: "24px 84px 66px" }, [
        box({ flexDirection: "column" }, [
          box({ fontSize: 72, fontWeight: 700, lineHeight: 1.05, color: "#ffffff" }, headline),
          box({ height: 20 }, []),
          box({ fontSize: 36, fontWeight: 400, lineHeight: 1.38, color: "rgba(255,255,255,0.86)" }, tip),
        ]),
        // call-to-action row: download text (left) + two QR cards (right)
        box({ alignItems: "flex-end", justifyContent: "space-between" }, [
          box({ flexDirection: "column" }, [
            box({ alignItems: "center" }, [
              box(
                { backgroundColor: GREEN, color: "#ffffff", fontWeight: 700, fontSize: 30, letterSpacing: 1, padding: "18px 36px", borderRadius: 999 },
                "DOWNLOAD FREE",
              ),
            ]),
            box({ height: 16 }, []),
            box({ fontSize: 30, fontWeight: 600, color: "#cfe8d6" }, "iOS & Android"),
            box({ height: 16 }, []),
            box({ fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.9)" }, "Safety in one tap"),
            box({ height: 22 }, []),
            box({ alignItems: "center" }, [
              box({ fontSize: 36, fontWeight: 700, color: GREEN }, "One Tap Alert"),
              box({ width: 14 }, []),
              box({ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.6)" }, "·  onetapalert.com"),
            ]),
          ]),
          qrRow,
        ]),
      ]),
    ],
  );

  const svg = await satori(tree, {
    width: 1080,
    height: 1350,
    fonts: [
      { name: "Poppins", data: regular, weight: 400, style: "normal" },
      { name: "Poppins", data: semi, weight: 600, style: "normal" },
      { name: "Poppins", data: bold, weight: 700, style: "normal" },
    ],
  });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1080 } }).render().asPng();
}

// ---- imgbb upload ----------------------------------------------------------

async function uploadToImgbb(png) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) throw new Error("IMGBB_API_KEY is not set.");
  const body = new URLSearchParams({ image: png.toString("base64") });
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  const url = data?.data?.url || data?.data?.display_url;
  if (!res.ok || !url) throw new Error(`imgbb upload failed: ${JSON.stringify(data).slice(0, 200)}`);
  return url;
}

// ---- Meta Graph posting (self-contained) -----------------------------------

async function graph(pathPart, params) {
  const res = await fetch(`https://graph.facebook.com/${graphVersion}/${pathPart}`, {
    method: "POST",
    body: new URLSearchParams(params),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(`Graph API ${res.status}: ${data.error?.message || JSON.stringify(data)}`);
  return data;
}

async function resolvePageToken(token, pageId) {
  try {
    const res = await fetch(
      `https://graph.facebook.com/${graphVersion}/${pageId}?fields=access_token&access_token=${encodeURIComponent(token)}`,
    );
    const data = await res.json().catch(() => ({}));
    if (res.ok && !data.error && data.access_token) return data.access_token;
  } catch {
    /* fall back */
  }
  return token;
}

async function postToFacebook(token, pageId, imageUrl, caption) {
  const data = await graph(`${pageId}/photos`, { url: imageUrl, caption, access_token: token });
  return data.post_id || data.id;
}

async function postToInstagram(token, igUserId, imageUrl, caption) {
  const container = await graph(`${igUserId}/media`, { image_url: imageUrl, caption, access_token: token });
  if (!container.id) throw new Error("Instagram: no creation id returned.");
  // Wait for IG to finish ingesting the image before publishing (larger images need a moment).
  for (let i = 0; i < 20; i++) {
    const res = await fetch(
      `https://graph.facebook.com/${graphVersion}/${container.id}?fields=status_code&access_token=${encodeURIComponent(token)}`,
    );
    const st = await res.json().catch(() => ({}));
    if (st.status_code === "FINISHED") break;
    if (st.status_code === "ERROR" || st.status_code === "EXPIRED") {
      throw new Error(`Instagram container ${st.status_code}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  const published = await graph(`${igUserId}/media_publish`, { creation_id: container.id, access_token: token });
  return published.id;
}

// ---- main ------------------------------------------------------------------

async function main() {
  const history = await loadHistory();
  const content = mock ? MOCK_CONTENT : await writeContent(history);
  console.log(`\nPoster: [${content.category}] "${content.headline}"`);
  console.log(`Tip:    ${content.tip}`);

  const photoQuery = content.imageQuery || content.headline;
  let photoDataUri = await fetchPhotoDataUri(photoQuery, history.length); // Pexels, if keyed
  let photoSource = photoDataUri ? `Pexels "${photoQuery}"` : "";
  if (!photoDataUri) {
    photoDataUri = await fetchUnsplashDataUri(history.length); // no-key fallback
    photoSource = photoDataUri ? "Unsplash pool" : "";
  }
  console.log(`Photo:  ${photoDataUri ? photoSource : "none (gradient fallback)"}`);

  const qrOpts = { margin: 1, width: 300, color: { dark: "#1A2E1A", light: "#ffffff" } };
  const appleQr = await QRCode.toDataURL(APP_STORE_URL, qrOpts);
  const androidQr = await QRCode.toDataURL(PLAY_STORE_URL, qrOpts);

  const png = await renderPoster({ ...content, photoDataUri, appleQr, androidQr });
  console.log(`Rendered poster PNG (${Math.round(png.length / 1024)} KB).`);

  const hashtags = (Array.isArray(content.hashtags) ? content.hashtags : [])
    .map((h) => (h.startsWith("#") ? h : `#${h}`))
    .slice(0, 8);
  const caption = `${(content.caption || content.tip).trim()}\n\n📲 Download One Tap Alert free — safety in one tap:\n🍎 iPhone: ${APP_STORE_URL}\n🤖 Android: ${PLAY_STORE_URL}\n\n${hashtags.join(" ")}`.trim();
  console.log(`\n--- caption ---\n${caption}\n---------------\n`);

  if (dryRun) {
    const preview = path.join(root, "scripts", ".preview-poster.png");
    await writeFile(preview, png);
    console.log(`--dry-run: wrote preview to ${path.relative(root, preview)} (not uploading or posting).`);
    return;
  }

  const imageUrl = await uploadToImgbb(png);
  console.log(`Uploaded poster: ${imageUrl}`);

  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  const igUserId = process.env.META_IG_USER_ID;
  if (!token || (!pageId && !igUserId)) {
    console.error("Nothing to post to. Set META_ACCESS_TOKEN plus META_PAGE_ID and/or META_IG_USER_ID.");
    process.exit(1);
  }
  const postToken = pageId ? await resolvePageToken(token, pageId) : token;

  const results = [];
  if (pageId) {
    try {
      console.log(`✓ Facebook posted (${await postToFacebook(postToken, pageId, imageUrl, caption)})`);
      results.push(true);
    } catch (err) {
      console.error(`✗ Facebook failed: ${err.message}`);
      results.push(false);
    }
  }
  if (igUserId) {
    try {
      console.log(`✓ Instagram posted (${await postToInstagram(postToken, igUserId, imageUrl, caption)})`);
      results.push(true);
    } catch (err) {
      console.error(`✗ Instagram failed: ${err.message}`);
      results.push(false);
    }
  }
  if (!results.some(Boolean)) throw new Error("All configured platforms failed to post.");

  // Record history (for dedup) - committed by the workflow.
  history.push({ date: new Date().toISOString().slice(0, 10), headline: content.headline });
  await mkdir(path.dirname(historyPath), { recursive: true });
  await writeFile(historyPath, `${JSON.stringify(history, null, 2)}\n`, "utf8");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
