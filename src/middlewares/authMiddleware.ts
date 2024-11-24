import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes: Array<string> = ["/dashboard", "/shops"]

const authRoutes: Array<string> = ["/signin", "/signup", "/resetpassword", "/forgetpassword", "/activate"]

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  if (authRoutes.some((item) => pathname.includes(item))) {
    if (token) return NextResponse.redirect(`${origin}`);
  }
  if (protectedRoutes.includes(pathname)) {
    if (!token)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin`);
  }
}
