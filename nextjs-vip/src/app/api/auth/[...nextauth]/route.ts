import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session, User, Account } from "next-auth";
import { login, loginWithGoogle } from "@/lib/firebase/service";
import bcrypt from "bcrypt";
import GoogleAuthProvider from "next-auth/providers/google";

interface AppUser extends User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface GoogleLoginResult {
  status: boolean;
  data: {
    email: string;
    fullname: string;
    role: "admin" | "user";
  };
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
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<AppUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        const { email, password } = credentials;

        const user = (await login({ email })) as AppUser | null;
        console.log("user :", user);

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
      },
    }),
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | AppUser;
      account?: Account | null;
    }): Promise<JWT> {
      if (user) {
        const appUser = user as AppUser;
        token.id = appUser.id;
        token.email = appUser.email;
        token.fullname = appUser.fullname;
        token.role = appUser.role;
      }

      if (account?.provider === "google" && user?.email) {
        const data = {
          fullname: user.name ?? "",
          email: user.email,
          role: "user" as const,
          type: "google",
        };

        const result = await loginWithGoogle(data);
        if (result?.status && result.data) {
          token.email = result.data.email;
          token.fullname = result.data.fullname;
          token.role = result.data.role;
        }
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
