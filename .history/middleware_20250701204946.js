import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname.startsWith("/dashboard");

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (isDashboardPage) {

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

      const isDetailPage = pathParts.length === 4;

      if (!token?.isAdmin && (!isDetailPage || !isOwnPage)) {
        console.log("Unauthorized user trying to access another profile.");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

  // All other cases — allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Apply middleware only to these paths
};
