import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
     signIn: "/login",
    error: "/error", // redirect if not logged in
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // protected routes
};
