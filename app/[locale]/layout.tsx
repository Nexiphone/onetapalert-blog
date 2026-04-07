import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Locale,
  locales,
  isValidLocale,
  getTranslations,
  localeNames,
  localeOgMap,
} from '@/lib/i18n';
import { isRtl, getDirection } from '@/lib/rtl';

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

  return {
    metadataBase: new URL('https://blog.onetapalert.com'),
    title: {
      default: t.meta.defaultTitle,
      template: t.meta.titleTemplate,
    },
    description: t.meta.defaultDescription,
    keywords: [
      'personal safety app',
      'SOS alert',
      'emergency contacts',
      'safety app',
      'One Tap Alert',
      'location sharing',
      'emergency preparedness',
      'campus safety',
    ],
    authors: [{ name: 'One Tap Alert', url: 'https://onetapalert.com' }],
    creator: 'One Tap Alert',
    publisher: 'One Tap Alert',
    openGraph: {
      type: 'website',
      locale: localeOgMap[locale],
      url: `https://blog.onetapalert.com/${locale}`,
      siteName: t.nav.oneTapAlertBlog,
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
      canonical: `https://blog.onetapalert.com/${locale}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `https://blog.onetapalert.com/${loc}`])
      ),
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);
  const dir = getDirection(locale);
  const rtl = isRtl(locale);

  return (
    <div dir={dir}>
      {/* Navigation */}
      <nav className="bg-ota-dark border-b border-green-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={`/${locale}`}
                className="flex items-center space-x-2"
              >
                <span className="text-2xl">🔔</span>
                <span className="text-lg font-bold text-white hidden sm:inline">
                  One Tap <span className="text-ota-green">Alert</span>
                </span>
              </Link>
            </div>
            <div className={`flex items-center ${rtl ? 'space-x-reverse' : ''} space-x-3 sm:space-x-5`}>
              {/* Language Switcher Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="hidden sm:inline">{localeNames[locale]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-80 overflow-y-auto">
                  <div className="py-1 grid grid-cols-2 gap-0">
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={`/${loc}`}
                        className={`block px-3 py-2 text-sm transition-colors ${
                          loc === locale
                            ? 'bg-ota-green-light text-ota-green-dark font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {localeNames[loc]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/${locale}`}
                className="text-gray-300 hover:text-white text-sm transition-colors hidden sm:inline"
              >
                {t.nav.allPosts}
              </Link>
              <a
                href="https://apps.apple.com/us/app/one-tap-alert/id6758563344"
                className="bg-ota-gradient text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.downloadApp}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-ota-dark text-gray-400 border-t border-green-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🔔</span>
                <span className="text-xl font-bold text-white">
                  One Tap <span className="text-ota-green">Alert</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                {t.footer.brandDescription}
              </p>
              <div className="mt-4">
                <a
                  href="https://apps.apple.com/us/app/one-tap-alert/id6758563344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-10"
                  />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://onetapalert.com" className="hover:text-white transition-colors">
                    {t.footer.home}
                  </a>
                </li>
                <li>
                  <a href="https://onetapalert.com/about" className="hover:text-white transition-colors">
                    {t.footer.about}
                  </a>
                </li>
                <li>
                  <a href="https://onetapalert.com/pricing" className="hover:text-white transition-colors">
                    {t.footer.pricing}
                  </a>
                </li>
                <li>
                  <Link href={`/${locale}`} className="hover:text-white transition-colors">
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
                  <a href="https://onetapalert.com/contact" className="hover:text-white transition-colors">
                    {t.footer.contactUs}
                  </a>
                </li>
                <li>
                  <a href="https://onetapalert.com/privacy" className="hover:text-white transition-colors">
                    {t.footer.privacyPolicy}
                  </a>
                </li>
                <li>
                  <a href="https://onetapalert.com/terms" className="hover:text-white transition-colors">
                    {t.footer.termsOfService}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-900/30 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} One Tap Alert.{' '}
              {t.footer.allRightsReserved}
            </p>
            <p className="text-sm mt-2 sm:mt-0">{t.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
