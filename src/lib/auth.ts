import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { sendEmail, welcomeEmail } from "./email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as ReturnType<typeof PrismaAdapter>,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "repo read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const ghId = String(account?.providerAccountId ?? "");

      console.log("[AUTH] signIn attempt", {
        email: user.email,
        provider: account?.provider,
        ghId,
        githubLogin: (profile as Record<string, unknown>)?.login,
        hasAccessToken: !!account?.access_token,
      });

      if (account?.provider === "github" && account.access_token) {
        try {
          // Find existing user by githubId OR email (avoids unique constraint conflicts)
          const existing = await prisma.user.findFirst({
            where: {
              OR: [
                { githubId: ghId },
                { email: user.email! },
              ],
            },
            select: { id: true, email: true, githubId: true },
          });

          console.log("[AUTH] existing user:", existing ?? "NEW");

          if (existing) {
            // Update existing user — always sync token, email, and githubId
            await prisma.user.update({
              where: { id: existing.id },
              data: {
                githubToken: account.access_token,
                githubId: ghId,
                email: user.email!,
                name: user.name ?? undefined,
                image: user.image ?? undefined,
              },
            });
            console.log("[AUTH] user updated:", existing.id);
          } else {
            // Create new user
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                githubId: ghId,
                githubToken: account.access_token,
              },
            });
            console.log("[AUTH] new user created");

            if (user.email) {
              const { subject, html } = welcomeEmail(user.name ?? "there");
              sendEmail(user.email, subject, html).catch((err) =>
                console.error("[AUTH] welcome email failed:", err)
              );
            }
          }
        } catch (err) {
          console.error("[AUTH] signIn error:", err);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  logger: {
    error(code, ...message) {
      console.error("[AUTH ERROR]", code, ...message);
    },
    warn(code, ...message) {
      console.warn("[AUTH WARN]", code, ...message);
    },
  },
  pages: {
    signIn: "/login",
  },
});
