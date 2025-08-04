import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt',
    maxAge: 60* 60 , // 1 hour (optional, session max duration)
  },
  jwt: {
    maxAge: 60* 60,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isProtectedPath =
        pathname.startsWith("/dashboard") || pathname.startsWith("/invoice");

      console.log("Auth:", auth);

      // Require login for protected paths
      if (isProtectedPath) {
        return isLoggedIn;
      }
  
      // Redirect logged-in users to /dashboard if accessing root or other pages last updated
       if (isLoggedIn && (pathname === "/" || pathname === "/login" ) ) {
        // Redirect to /dashboard if the user is logged in
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    // 3. Allow other access
    return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
