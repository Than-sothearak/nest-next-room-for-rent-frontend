import { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

    const isProtectedPath = pathname.startsWith('/dashboard') || pathname.startsWith('/invoice');

console.log('Auth:', auth);
console.log('Path:', pathname);

// Require login for protected paths
if (isProtectedPath) {
  return isLoggedIn;
}
      // Redirect logged-in users to /dashboard if accessing root or other pages
      if (isLoggedIn && pathname === '/') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} 