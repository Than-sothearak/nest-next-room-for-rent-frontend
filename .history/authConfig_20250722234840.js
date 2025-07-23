import { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
    callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const protectedPaths = ['/dashboard', '/invoice'];

      const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
      );

      console.log('Auth:', auth);
      console.log('Path:', pathname);

      if (isProtected && !isLoggedIn) {
        return false; // Will redirect to /login
      }

      // Optional: redirect logged-in users from root (/) to /dashboard
      if (isLoggedIn && pathname === '/') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} 