import { NextRequest, NextResponse } from 'next/server';
import { Tokens } from './shared/constants/token.constants';
import { PAGES_URL } from './shared/config/pages-url.config';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(Tokens.REFRESH_TOKEN)?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith('/log-in') || pathname.startsWith('/register');

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(PAGES_URL.PROFILES, request.url));
  }

  if (!refreshToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
};
