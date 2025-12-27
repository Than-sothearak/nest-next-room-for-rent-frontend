import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./authConfig";


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        
  const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: 'include', // ✅ crucial for HttpOnly cookie
  });
 const data = await res.json();
  if (!res.ok) {
   
     return data?.message || "Authentication failed";
  };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.username = user.username;
        token.imageUrl = user.imageUrl;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token._id = user._id.toString();
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id.toString(),
          username: token.username,
          email: token.email,
          imageUrl: token.imageUrl,
          isAdmin: token.isAdmin,
        };
      }
      return session;
    },
  },
});