import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import { login } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

interface AppUser extends User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
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

        const user: AppUser = await login({ email });
        console.log("user :", user);

        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            return user;
          } else {
            return null;
          }
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
        token.fullname = appUser.fullname;
        token.role = appUser.role;
      }

      console.log("token :", token);

      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.fullname = token.fullname as string;
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
