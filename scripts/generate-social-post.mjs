#!/usr/bin/env node
/**
 * Generates one social media post per run from the day's blog article and
 * publishes it to a Facebook Page and/or Instagram via the Meta Graph API.
 *
 * It picks the newest *already-published* English article under posts/en/
 * (the one the daily blog job just made live), asks the Claude API to write a
 * short, engaging caption with hashtags + a link to the article, and reuses the
 * article's cover image as the photo. Posting to each platform is independent:
 * a platform is only attempted if its env vars are present, and a failure on one
 * platform does not stop the other.
 *
 * Zero npm dependencies — uses only Node built-ins + global fetch (Node 18+).
 *
 * Env:
 *   ANTHROPIC_API_KEY   (required) — writes the caption
 *   CLAUDE_MODEL        (optional, default claude-sonnet-4-6)
 *   SITE_BASE           (optional, default https://blog.onetapalert.com) — link + image base
 *   META_ACCESS_TOKEN   (required to post) — long-lived token, works for Page + IG
 *   META_PAGE_ID        (optional) — Facebook Page ID; enables Facebook posting
 *   META_IG_USER_ID     (optional) — Instagram Business account ID; enables Instagram posting
 *   META_GRAPH_VERSION  (optional, default v21.0)
 *
 * Usage:
 *   node scripts/generate-social-post.mjs            # post the newest published article
 *   node scripts/generate-social-post.mjs --dry-run  # write caption, do not post
 *   node scripts/generate-social-post.mjs --date=YYYY-MM-DD  # target a specific day's post
 *   node scripts/generate-social-post.mjs --slug=some-slug   # target a specific article
 */
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const enPostsDir = path.join(root, "posts", "en");

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY is not set. Add it as a GitHub Actions secret.");
  process.exit(1);
}
const model = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";
const siteBase = (process.env.SITE_BASE || "https://blog.onetapalert.com").replace(/\/+$/, "");
const graphVersion = process.env.META_GRAPH_VERSION || "v21.0";

const dryRun = process.argv.includes("--dry-run");
const dateArg = process.argv.find((a) => a.startsWith("--date="))?.split("=")[1];
const slugArg = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1];

const today = new Date().toISOString().slice(0, 10);

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found in model output.");
  return JSON.parse(candidate.slice(start, end + 1));
}

/**
 * Minimal YAML-frontmatter reader. Our posts use simple `key: "value"` lines
 * between the leading `---` fences, so a tiny parser keeps this script
 * dependency-free (no gray-matter needed in the social workflow).
 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[kv[1]] = val;
  }
  return out;
}

/**
 * Load every English post and return the one for --slug / --date, else the
 * newest one whose date is on or before today (so we never share a future-dated
 * post the blog hasn't actually published yet).
 */
async function pickPost() {
  let files;
  try {
    files = (await readdir(enPostsDir)).filter((f) => f.endsWith(".mdx"));
  } catch {
    throw new Error(`No English posts directory at ${enPostsDir}.`);
  }
  const posts = [];
  for (const f of files) {
    try {
      const raw = await readFile(path.join(enPostsDir, f), "utf8");
      const fm = parseFrontmatter(raw);
      posts.push({ ...fm, slug: f.replace(/\.mdx$/, "") });
    } catch {
      /* skip unreadable files */
    }
  }
  if (!posts.length) throw new Error("No blog posts found to share.");

  const dateOf = (p) => (p.date || "").slice(0, 10);

  if (slugArg) {
    const match = posts.find((p) => p.slug === slugArg);
    if (!match) throw new Error(`No post found with slug "${slugArg}".`);
    return match;
  }
  if (dateArg) {
    const match = posts.find((p) => dateOf(p) === dateArg);
    if (!match) throw new Error(`No post found for ${dateArg}.`);
    return match;
  }
  const live = posts.filter((p) => dateOf(p) && dateOf(p) <= today);
  const pool = live.length ? live : posts;
  pool.sort((a, b) => (dateOf(a) < dateOf(b) ? 1 : dateOf(a) > dateOf(b) ? -1 : 0));
  return pool[0];
}

async function writeCaption(post) {
  const articleUrl = `${siteBase}/en/blog/${post.slug}/`;
  const system =
    "You write short, lively social media captions for One Tap Alert (onetapalert.com) — a " +
    "personal-safety SOS app for iPhone. Key features: a one-tap SOS button that alerts your " +
    "emergency contacts with your live location, real-time GPS location sharing, a Safety Timer " +
    "(set a countdown for a walk, run, or date — if you don't check in, your contacts are " +
    "auto-alerted), an encrypted Secure Vault for IDs and medical info, and unlimited emergency " +
    "contacts. Privacy-first: no background tracking, no location history stored, no data selling. " +
    "Free to download; premium is $5.99/month or $24.99/year. Captions are warm, reassuring and " +
    "practical — empowering, never fear-mongering, and never spammy. Write for a UNITED STATES " +
    "audience: American English spelling and idioms, US references, dollars ($). You ALWAYS " +
    "respond with a single valid JSON object and nothing else.";

  const prompt = `Write one social media caption promoting this One Tap Alert blog article.

Article title: ${post.title}
Article description: ${post.description || ""}
Category: ${post.category || ""}

Requirements:
- 1-2 short sentences tied to the article that make people want to read it.
- Naturally work in One Tap Alert's value: personal safety made simple — a one-tap SOS, live
  location sharing, and a Safety Timer that watches your back. Vary the wording every time
  (never a rigid template). Reassuring and empowering, never scary.
- A natural call to action to read more (the article link is added separately, do NOT include a URL in the caption text).
- 3-6 tasteful hashtags. ALWAYS include #OneTapAlert and one US-geo tag (#USA, or a major US city
  if the article is about one). Use descriptive + brand tags only, e.g. #OneTapAlert, #PersonalSafety,
  #SafetyFirst, #StaySafe, #SafetyTips, #SOS, #EmergencyPreparedness, #SafetyApp, #USA.
- A few fitting emojis, but don't overdo it.
- Total length well under 600 characters so it fits every platform.

Return ONLY a JSON object with EXACTLY these fields:
{
  "caption": "the caption text WITHOUT hashtags and WITHOUT any URL",
  "hashtags": ["#OneTapAlert", "#..."]
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Claude API error ${res.status}: ${body}`);
  }
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || "").join("");
  const out = extractJson(text);

  const hashtags = (Array.isArray(out.hashtags) ? out.hashtags : [])
    .map((h) => (h.startsWith("#") ? h : `#${h}`))
    .slice(0, 8);
  const caption = (out.caption || "").trim();
  // Final composed text: caption + link + hashtags.
  const full = `${caption}\n\nRead more: ${articleUrl}\n\n${hashtags.join(" ")}`.trim();
  return { full, articleUrl };
}

async function graph(pathPart, params) {
  const url = `https://graph.facebook.com/${graphVersion}/${pathPart}`;
  const body = new URLSearchParams(params);
  const res = await fetch(url, { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    const msg = data.error?.message || JSON.stringify(data);
    throw new Error(`Graph API ${res.status}: ${msg}`);
  }
  return data;
}

async function postToFacebook(token, pageId, imageUrl, message) {
  const data = await graph(`${pageId}/photos`, {
    url: imageUrl,
    caption: message,
    access_token: token,
  });
  return data.post_id || data.id;
}

async function postToInstagram(token, igUserId, imageUrl, caption) {
  // Step 1: create a media container.
  const container = await graph(`${igUserId}/media`, {
    image_url: imageUrl,
    caption,
    access_token: token,
  });
  if (!container.id) throw new Error("Instagram: no creation id returned.");
  // Step 1b: wait for IG to finish ingesting the image before publishing.
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
  // Step 2: publish it.
  const published = await graph(`${igUserId}/media_publish`, {
    creation_id: container.id,
    access_token: token,
  });
  return published.id;
}

/**
 * Posting to a Facebook Page requires a PAGE access token. If META_ACCESS_TOKEN
 * is a (long-lived) USER token, posting to /{page}/photos fails. So we ask the
 * Page for its own access_token and use that. If the token is already a Page
 * token, this returns it unchanged. Falls back to the original token on failure.
 */
async function resolvePageToken(token, pageId) {
  try {
    const url = `https://graph.facebook.com/${graphVersion}/${pageId}?fields=access_token&access_token=${encodeURIComponent(
      token,
    )}`;
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));
    if (res.ok && !data.error && data.access_token) {
      console.log("Using derived Page access token for posting.");
      return data.access_token;
    }
  } catch {
    /* fall back to the provided token */
  }
  return token;
}

async function main() {
  const post = await pickPost();
  // The blog serves cover images from /images/blog/<slug>.jpg on the live site.
  const imageUrl = post.image
    ? (/^https?:\/\//.test(post.image) ? post.image : `${siteBase}${post.image.startsWith("/") ? "" : "/"}${post.image}`)
    : null;
  if (!imageUrl || !/^https:\/\//.test(imageUrl)) {
    throw new Error(`Post "${post.title}" has no public https cover image to share.`);
  }

  const { full, articleUrl } = await writeCaption(post);
  console.log(`\nSharing: "${post.title}"`);
  console.log(`Link:    ${articleUrl}`);
  console.log(`Image:   ${imageUrl}`);
  console.log(`\n--- caption ---\n${full}\n---------------\n`);

  if (dryRun) {
    console.log("--dry-run: not posting to any platform.");
    return;
  }

  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  const igUserId = process.env.META_IG_USER_ID;

  if (!token || (!pageId && !igUserId)) {
    console.error(
      "Nothing to post to. Set META_ACCESS_TOKEN plus META_PAGE_ID and/or META_IG_USER_ID.",
    );
    process.exit(1);
  }

  // A Page token works for both Facebook Page posts and Instagram publishing.
  const postToken = pageId ? await resolvePageToken(token, pageId) : token;

  const results = [];
  if (pageId) {
    try {
      const id = await postToFacebook(postToken, pageId, imageUrl, full);
      console.log(`✓ Facebook posted (${id})`);
      results.push({ platform: "facebook", ok: true });
    } catch (err) {
      console.error(`✗ Facebook failed: ${err.message}`);
      results.push({ platform: "facebook", ok: false });
    }
  }
  if (igUserId) {
    try {
      const id = await postToInstagram(postToken, igUserId, imageUrl, full);
      console.log(`✓ Instagram posted (${id})`);
      results.push({ platform: "instagram", ok: true });
    } catch (err) {
      console.error(`✗ Instagram failed: ${err.message}`);
      results.push({ platform: "instagram", ok: false });
    }
  }

  const anyOk = results.some((r) => r.ok);
  if (!anyOk) {
    throw new Error("All configured platforms failed to post.");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
