import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { organization, twoFactor, magicLink } from "better-auth/plugins";
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    username: true,
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 5,
      membershipLimit: 100,
      // roles par défaut : owner, admin, member
      defaultRole: "USER",
      hooks: {
        afterUserCreate: async ({ user }: { user: { email: string; username: string } }) => {
          // Stripe profile auto-link
          // await createStripeProfile(user.email, user.username);
        },
      },
    }),
    twoFactor(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // Envoi du mail (SMTP, etc.)
      },
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET!,
});
