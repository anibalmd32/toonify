import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { Resend } from "resend";
import { db } from "@/db";
import { renderTemplate } from "@/emails/VerificationEmail";

export const auth = betterAuth({
  user: {
    modelName: "users",
  },
  account: {
    modelName: "accounts",
  },
  session: {
    modelName: "sessions",
  },
  verification: {
    modelName: "verifications",
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `Syntaxia <${process.env.RESEND_DOMAIN}>`,
        to: [
          user.email,
        ],
        subject: "Verify your Syntaxia account",
        html: await renderTemplate({
          url,
          userEmail: user.email,
        }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  plugins: [
    reactStartCookies(),
  ],
});
