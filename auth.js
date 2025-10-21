import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { z } from "zod";
import { verifyPassword } from "@/lib/isVerify";
import { authConfig } from "./authConfig";

export async function getUser(email) {
  await mongoDb();
  try {
    const user = await User.findOne({ email: email });
    return user ? user : null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await verifyPassword(password, user.password);
          if (passwordsMatch) 
            return user;
        }
        console.log("Invalid credentials");
        return null;
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