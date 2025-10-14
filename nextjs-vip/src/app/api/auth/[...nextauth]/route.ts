import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

interface AppUser extends User {
  id: string;
  role: "admin" | "user";
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "rawrr12345",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AppUser | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: AppUser = {
          id: "1",
          name: "Al Riansyah",
          email: "user@domain.com",
          role: "admin",
        };

        if (email === "user@domain.com" && password === "12345678") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        const appUser = user as AppUser;
        token.id = appUser.id;
        token.email = appUser.email;
        token.name = appUser.name;
        token.role = appUser.role;
      }
      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
