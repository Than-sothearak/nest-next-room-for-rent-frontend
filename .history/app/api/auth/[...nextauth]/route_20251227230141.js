// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize() {
        return {
          id: "1",
          name: "Test",
          email: "test@test.com",
        };
      },
    }),
  ],
};

export const { GET, POST } = NextAuth(authOptions);
