import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import {
  Locale,
  isValidLocale,
  getTranslations,
  localeDateFormats,
} from '@/lib/i18n';
import { isRtl } from '@/lib/rtl';

interface Props {
  params: { locale: string };
}

export default function LocaleHomePage({ params }: Props) {
  const locale = params.locale as Locale;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);
  const posts = getAllPosts(locale);
  const dateLocale = localeDateFormats[locale];
  const rtl = isRtl(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-ota-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-ota-gradient opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            <span className="text-2xl sm:text-3xl block mb-2">🔔</span>
            <span className="gradient-text">{t.nav.oneTapAlertBlog}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.blog.heroSubtitle}
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="https://apps.apple.com/us/app/one-tap-alert/id6758563344"
              className="bg-ota-gradient text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.blog.downloadApp}
            </a>
            <a
              href="#posts"
              className="border border-green-500/50 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-lg hover:border-green-400 transition-colors"
            >
              {t.blog.readArticles}
            </a>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section
        id="posts"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t.blog.latestArticles}
        </h2>
        <p className="text-gray-500 mb-10">{t.blog.stayInformed}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block bg-white rounded-xl border border-gray-200 hover:border-ota-green/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 overflow-hidden"
            >
              {/* Card Image */}
              <div className="h-48 bg-ota-gradient relative overflow-hidden">
                {post.image && post.image.startsWith('/') ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-ota-gradient opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-70">
                        {post.category === 'City Safety' ? '🏙️' : post.category === 'Student Safety' ? '🎓' : post.category === 'Elderly Safety' ? '👴' : post.category === 'Emergency Preparedness' ? '🚨' : post.category === 'App Features' ? '📱' : '🛡️'}
                      </span>
                    </div>
                  </>
                )}
                {/* Category Badge */}
                <div className={`absolute top-4 ${rtl ? 'right-4' : 'left-4'}`}>
                  <span className="bg-ota-green/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>
                    {post.readingTime} {t.blog.minRead}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-ota-green transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <div className={`mt-4 flex items-center text-ota-green text-sm font-medium ${rtl ? 'flex-row-reverse' : ''}`}>
                  {t.blog.readMore}
                  <svg
                    className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${rtl ? 'mr-1 rotate-180' : 'ml-1'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ota-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">{t.cta.description}</p>
          <a
            href="https://apps.apple.com/us/app/one-tap-alert/id6758563344"
            className="inline-block bg-ota-gradient text-white font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.downloadNow}
          </a>
        </div>
      </section>
    </>
  );
}
