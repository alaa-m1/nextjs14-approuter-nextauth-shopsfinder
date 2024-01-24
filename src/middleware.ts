import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  if (pathname === "/signin" || pathname === "/signup") {
    if (token) return NextResponse.redirect(`${origin}`);
  }
  if (pathname === "/dashboard") {
    if (!token)
      return NextResponse.redirect(`${process.env.BASE_URL}/signin`);
  }
}
