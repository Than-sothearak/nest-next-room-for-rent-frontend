import { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isOnDashboard = pathname.startsWith('/dashboard');
      const isOnInvoice = pathname.startsWith('/invoice');

      console.log('Auth:', auth);
      console.log('Path:', pathname);

      if (isOnDashboard) {
        return isLoggedIn;
      }

      // Allow access to /invoice/ without login
      if (isOnInvoice && isLoggedIn) {
        return true;
      }

      // Redirect logged-in users to /dashboard if accessing root or other pages
      if (isLoggedIn && pathname === '/') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add your auth providers later
};
