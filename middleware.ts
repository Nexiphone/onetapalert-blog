import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'zh', 'tl', 'vi', 'ko', 'hi', 'bn', 'ur', 'ar', 'so', 'ru', 'pl', 'fr', 'pt', 'de', 'ja', 'he'];
const defaultLocale = 'en';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const parts = lang.trim().split(';');
      const code = parts[0].trim().toLowerCase();
      const quality = parts[1]
        ? parseFloat(parts[1].replace('q=', ''))
        : 1.0;
      return { code, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    const primary = code.split('-')[0];
    if (locales.includes(primary)) {
      return primary;
    }
    if (locales.includes(code)) {
      return code;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'],
};
