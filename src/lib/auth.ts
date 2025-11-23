import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { Resend } from "resend";
import { db } from "@/db";
import { renderTemplate } from "@/emails/VerificationEmail";
import { constants } from "../../constants";

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
      const resend = new Resend(constants.RESEND_API_KEY);

      await resend.emails.send({
        from: "Toonify <delivered@resend.dev>",
        to: [
          "anibalmd32@gmail.com",
        ],
        subject: "Verify your toonify account",
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
