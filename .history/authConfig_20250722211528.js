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

    if (!isLoggedIn && isOnDashboard) return false; // Redirect to /login
    if (isLoggedIn && isOnLogin) return false; // Redirect to /dashboard or home

      // // Allow access to all other pages (like home `/`) regardless of login
      return true;
    },
  },
  providers: [], // Add your authentication providers here
};
