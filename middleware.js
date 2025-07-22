import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isOnDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  if (!token && isOnDashboard) {
    console.log("You need to login first.");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  console.log(token?.email)

  // 🔐 Block admin access if not an admin
  if (!token?.isAdmin && pathname === "/dashboard/users") {
    console.log("Unauthorized: Admin dashboard access denied.");
    return NextResponse.redirect(new URL("/dashboard", req.url));
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