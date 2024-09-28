import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { cookieName, fallbackLng, languages } from '@/app/i18n/settings';
import type { NextRequest } from 'next/server';

acceptLanguage.languages(languages);

const protectedRoutes: Array<string> = ["/dashboard", "/shops", "/dashboard"];
const authRoutes: Array<string> = ["/signin", "/signup", "/resetpassword", "/forgetpassword", "/activate"];

export const config = {
  // matcher for both authentication and i18n
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Token for auth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if path is part of the auth routes
  if (authRoutes.some((item) => pathname.includes(item))) {
    if (token) return NextResponse.redirect(`${origin}`);
  }

  // Check if path is part of the protected routes
  if (protectedRoutes.includes(pathname)) {
    if (!token) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin`);
  }

  // i18n Language detection logic
  let lng;
  if (request.cookies.has(cookieName)) {
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(request.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  // Redirect if lng in path is not supported
  if (!languages.some((loc) => pathname.startsWith(`/${loc}`)) && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, request.url));
  }

  // Set language in cookie if referer is present
  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer')!);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }
    return response;
  }

  return NextResponse.next();
}
