import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getAllSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import {
  Locale,
  locales,
  isValidLocale,
  getTranslations,
  localeDateFormats,
} from '@/lib/i18n';
import { isRtl } from '@/lib/rtl';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!isValidLocale(locale)) return {};

  const post = getPostBySlug(params.slug, locale);
  if (!post) return {};

  const t = getTranslations(locale);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://blog.onetapalert.com/${locale}/blog/${post.slug}`,
      siteName: t.nav.oneTapAlertBlog,
      images: [
        {
          url: post.image?.startsWith('/')
            ? `https://blog.onetapalert.com${post.image}`
            : 'https://blog.onetapalert.com/og-default.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://blog.onetapalert.com/${locale}/blog/${post.slug}`,
      languages: Object.fromEntries(
        locales
          .filter((loc) => {
            const exists = getPostBySlug(params.slug, loc);
            return exists !== null;
          })
          .map((loc) => [
            loc,
            `https://blog.onetapalert.com/${loc}/blog/${post.slug}`,
          ])
      ),
    },
  };
}

function extractHeadings(
  content: string
): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff\u00e0-\u00ff\u0400-\u04ff\u0600-\u06ff\u0900-\u097f\u0980-\u09ff\u0590-\u05ff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({
      id,
      text,
      level: match[1].length,
    });
  }

  return headings;
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h([23])>(.+?)<\/h[23]>/g, (_, level, text) => {
    const id = text
      .replace(/<[^>]+>/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff\u00e0-\u00ff\u0400-\u04ff\u0600-\u06ff\u0900-\u097f\u0980-\u09ff\u0590-\u05ff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}

export default function BlogPostPage({ params }: Props) {
  const locale = params.locale as Locale;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const post = getPostBySlug(params.slug, locale);
  if (!post) notFound();

  const t = getTranslations(locale);
  const dateLocale = localeDateFormats[locale];
  const rtl = isRtl(locale);

  const allPosts = getAllPosts(locale);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category)
    .slice(0, 2);

  const finalRelated =
    relatedPosts.length >= 2
      ? relatedPosts
      : [
          ...relatedPosts,
          ...allPosts
            .filter(
              (p) =>
                p.slug !== post.slug &&
                !relatedPosts.find((r) => r.slug === p.slug)
            )
            .slice(0, 2 - relatedPosts.length),
        ];

  const headings = extractHeadings(post.rawContent);
  const contentWithIds = addIdsToHeadings(post.contentHtml);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image || 'https://blog.onetapalert.com/og-default.png',
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://onetapalert.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'One Tap Alert',
      url: 'https://onetapalert.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onetapalert.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.onetapalert.com/${locale}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      {post.image && post.image.startsWith('/') && (
        <div className="w-full h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-ota-dark">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ota-dark via-ota-dark/50 to-transparent" />
        </div>
      )}

      {/* Article Header */}
      <header className="bg-ota-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-ota-gradient opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href={`/${locale}`}
            className={`inline-flex items-center text-gray-400 hover:text-white text-sm mb-6 transition-colors ${rtl ? 'flex-row-reverse' : ''}`}
          >
            <svg
              className={`w-4 h-4 ${rtl ? 'ml-2 rotate-180' : 'mr-2'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.blog.backToBlog}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-ota-green/90 text-white text-xs font-medium px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">
              {post.readingTime} {t.blog.minRead}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-gray-300 mb-6">{post.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{post.author}</span>
            <span>&middot;</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(dateLocale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`flex flex-col lg:flex-row gap-12 ${rtl ? 'lg:flex-row-reverse' : ''}`}>
          {/* Table of Contents - Sidebar */}
          {headings.length > 0 && (
            <aside className="lg:w-64 shrink-0 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {t.blog.tableOfContents}
                </h2>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm text-gray-500 hover:text-ota-green transition-colors ${
                        heading.level === 3 ? (rtl ? 'pr-4' : 'pl-4') : ''
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>

                {/* CTA in Sidebar */}
                <div className="mt-8 p-4 bg-ota-dark rounded-lg">
                  <p className="text-white text-sm font-semibold mb-2">
                    {t.cta.stayProtected}
                  </p>
                  <p className="text-gray-400 text-xs mb-3">
                    {t.cta.getTheApp}
                  </p>
                  <a
                    href="https://apps.apple.com/us/app/one-tap-alert/id6758563344"
                    className="block text-center bg-ota-gradient text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.cta.downloadNow}
                  </a>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <article className="flex-1 order-1 lg:order-2 min-w-0">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />
          </article>
        </div>
      </div>

      {/* Related Posts */}
      {finalRelated.length > 0 && (
        <section className="bg-ota-beige border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t.blog.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {finalRelated.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/blog/${related.slug}`}
                  className="group block bg-white rounded-xl border border-gray-200 hover:border-ota-green/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 p-6"
                >
                  <span className="bg-ota-green-light text-ota-green-dark text-xs font-medium px-3 py-1 rounded-full">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-ota-green transition-colors mt-3 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {related.description}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <time dateTime={related.date}>
                      {new Date(related.date).toLocaleDateString(dateLocale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="mx-2">&middot;</span>
                    <span>
                      {related.readingTime} {t.blog.minRead}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
