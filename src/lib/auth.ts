import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as ReturnType<typeof PrismaAdapter>,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "repo read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" && account.access_token) {
        await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            githubToken: account.access_token,
            githubId: String(account.providerAccountId),
          },
          create: {
            email: user.email!,
            name: user.name,
            image: user.image,
            githubId: String(account.providerAccountId),
            githubToken: account.access_token,
          },
        });
      }
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
