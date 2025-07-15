export const authConfig = {
  pages: {
    signIn: '/login', // Custom login page
  },
   trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname === '/login';

      if (isOnDashboard) {
        // Only allow access to /dashboard if logged in
        return Response.redirect(new URL('/loign', nextUrl));
      }

      if (isOnLogin && isLoggedIn) {
        // If already logged in, redirect away from login page (e.g., to /dashboard)
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // // Allow access to all other pages (like home `/`) regardless of login
      return true;
    },
  },
  providers: [], // Add your authentication providers here
};
