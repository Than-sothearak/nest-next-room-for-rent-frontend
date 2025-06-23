import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isAdminDashboard = pathname.startsWith("/dashboard/admin");
  const isUserDashboard = pathname.startsWith("/dashboard/users");
  const isLogin = pathname === "/login";

  // 🔐 Block admin access if not an admin
  if (isAdminDashboard && !token?.isAdmin) {
    console.log("Unauthorized: Admin dashboard access denied.");
    return NextResponse.redirect(new URL("/", req.url));
  }

    if (isUserDashboard && !token?.isAdmin) {
    console.log("Unauthorized: Admin dashboard access denied.");
    return NextResponse.redirect(new URL("/", req.url));
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
