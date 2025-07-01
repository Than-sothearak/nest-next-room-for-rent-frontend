import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;


  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard/');
  const isOnLogin = nextUrl.pathname === '/login';

  if (isOnDashboard) {
    // Only allow access to /dashboard if logged in
    return isOnLogin;
  }


  const isUserDashboard = pathname.startsWith("/dashboard/users");
  const isLogin = pathname === "/login";


  if (isUserDashboard) {
    const pathParts = pathname.split("/"); // ['/dashboard', 'users', '12345']
    const userIdInPath = pathParts[3];     // '12345'

    // If it's /dashboard/users only (no ID), or ID is not the same as token.id, block it
    const isOwnPage = userIdInPath === token?._id;

    const isDetailPage = pathParts.length === 4; // Means it's /dashboard/users/:id

    if (!token?.isAdmin && (!isDetailPage || !isOwnPage)) {
      console.log("Unauthorized.");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 🚫 Prevent logged-in users from accessing login page
  if (isLogin && token) {
    console.log("Redirecting logged-in user from login page.");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  // ✅ Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Apply to both dashboards and login
};
