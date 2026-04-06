import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'zh', 'es'];
const defaultLocale = 'en';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header and find best match
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
    // Check exact match first (e.g., "zh-CN" -> "zh")
    const primary = code.split('-')[0];
    if (locales.includes(primary)) {
      return primary;
    }
    // Check full code match
    if (locales.includes(code)) {
      return code;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Skip internal Next.js paths, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static files like .css, .js, .png, etc.
  ) {
    return NextResponse.next();
  }

  // Redirect to the preferred locale
  const locale = getPreferredLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except static files and api routes
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'],
};
