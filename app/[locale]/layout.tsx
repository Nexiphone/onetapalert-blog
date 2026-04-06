import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Locale,
  locales,
  isValidLocale,
  getTranslations,
  localeNames,
  localeDateFormats,
} from '@/lib/i18n';

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!isValidLocale(locale)) return {};

  const t = getTranslations(locale);
  const localeMap: Record<Locale, string> = {
    en: 'en_US',
    zh: 'zh_CN',
    es: 'es_ES',
  };

  return {
    metadataBase: new URL('https://blog.nexitel.us'),
    title: {
      default: t.meta.defaultTitle,
      template: t.meta.titleTemplate,
    },
    description: t.meta.defaultDescription,
    keywords: [
      'prepaid wireless',
      'prepaid SIM',
      'eSIM',
      'no-contract plans',
      'international roaming',
      '5G coverage',
      'Nexitel',
      'mobile plans',
    ],
    authors: [{ name: 'Nexitel', url: 'https://nexitel.us' }],
    creator: 'Nexitel',
    publisher: 'Nexitel',
    openGraph: {
      type: 'website',
      locale: localeMap[locale],
      url: `https://blog.nexitel.us/${locale}`,
      siteName: t.nav.nexitelBlog,
      title: t.meta.defaultTitle,
      description: t.meta.defaultDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.defaultTitle,
      description: t.meta.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://blog.nexitel.us/${locale}`,
      languages: {
        en: 'https://blog.nexitel.us/en',
        zh: 'https://blog.nexitel.us/zh',
        es: 'https://blog.nexitel.us/es',
      },
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <>
      {/* Navigation */}
      <nav className="bg-nexitel-dark border-b border-purple-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                href={`/${locale}`}
                className="flex items-center space-x-2"
              >
                <span className="text-xl font-bold gradient-text">
                  {t.nav.nexitelBlog}
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 text-sm">
                {locales.map((loc, index) => (
                  <span key={loc} className="flex items-center">
                    {index > 0 && (
                      <span className="text-gray-500 mx-1">|</span>
                    )}
                    <Link
                      href={`/${loc}`}
                      className={`transition-colors ${
                        loc === locale
                          ? 'text-white font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {localeNames[loc]}
                    </Link>
                  </span>
                ))}
              </div>

              <Link
                href={`/${locale}`}
                className="text-gray-300 hover:text-white text-sm transition-colors hidden sm:inline"
              >
                {t.nav.allPosts}
              </Link>
              <a
                href="https://nexitel.us"
                className="text-gray-300 hover:text-white text-sm transition-colors hidden sm:inline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.backToNexitel} &rarr;
              </a>
              <a
                href="https://nexitel.us/blue-plans"
                className="bg-nexitel-gradient text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.viewPlans}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-nexitel-dark text-gray-400 border-t border-purple-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <span className="text-xl font-bold gradient-text">Nexitel</span>
              <p className="mt-3 text-sm leading-relaxed">
                {t.footer.brandDescription}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://nexitel.us"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.home}
                  </a>
                </li>
                <li>
                  <a
                    href="https://nexitel.us/blue-plans"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.plans}
                  </a>
                </li>
                <li>
                  <a
                    href="https://nexitel.us/purple-plans"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.purplePlans}
                  </a>
                </li>
                <li>
                  <a
                    href="https://nexitel.us/data-plans"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.dataPlans}
                  </a>
                </li>
                <li>
                  <Link
                    href={`/${locale}`}
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.blog}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {t.footer.support}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://nexitel.us/support"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.helpCenter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://nexitel.us/support"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.contactUs}
                  </a>
                </li>
                <li>
                  <a
                    href="https://nexitel.us/wholesale"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.wholesale}
                  </a>
                </li>
                <li>
                  <a
                    href="https://nexitel.us/compare"
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.comparePlans}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-900/30 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Nexitel.{' '}
              {t.footer.allRightsReserved}
            </p>
            <p className="text-sm mt-2 sm:mt-0">{t.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
