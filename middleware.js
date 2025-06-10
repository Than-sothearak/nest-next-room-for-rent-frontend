import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard/');
  const isOnLogin = req.nextUrl.pathname === '/login';

    if (isOnDashboard && !token?.isAdmin) {
      console.log('Unauthorized access to dashboard');
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isOnLogin && token) {
    // If already logged in, redirect away from login page (e.g., to /dashboard)
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow access to all other pages
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};