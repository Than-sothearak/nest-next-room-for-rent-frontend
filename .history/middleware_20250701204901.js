import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Redirect logged-in users away from /login
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard route
  if (isDashboardPage) {
    // If not logged in, redirect to /login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Handle /dashboard/users/:id access control
    const isUserDashboard = pathname.startsWith("/dashboard/users");
    if (isUserDashboard) {
      const pathParts = pathname.split("/"); // ['', 'dashboard', 'users', 'id']
      const userIdInPath = pathParts[3]; // 'id'

      const isOwnPage = userIdInPath === token?._id;
      const isDetailPage = pathParts.length === 4;

      if (!token?.isAdmin && (!isDetailPage || !isOwnPage)) {
        console.log("Unauthorized user trying to access another profile.");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  // All other cases — allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Apply middleware only to these paths
};
