import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as v from "valibot";
import { EmailSchema } from "@/definitions/validationSchemas/EmailSchema";
import { NameSchema } from "@/definitions/validationSchemas/NameSchema";
import i18n from "@/lib/i18n";

const signUpSearchSchema = v.object({
  userName: NameSchema,
  userEmail: EmailSchema,
});

export const Route = createFileRoute("/auth/signup-success")({
  component: RouteComponent,
  validateSearch: signUpSearchSchema,
  head: () => ({
    meta: [
      {
        title: `${i18n.t("pages.auth.success.tabTitle")} | Toonify`,
      },
    ],
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const { userEmail, userName } = Route.useSearch();

  return (
    <>
      <div className="card w-full max-w-md bg-base-100/80 shadow-2xl border border-base-200 backdrop-blur-xl z-10">
        <div className="card-body items-center text-center py-12 px-8">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-base-100 to-base-200 rounded-full flex items-center justify-center relative shadow-lg border border-base-200">
              <Mail className="w-12 h-12 text-[#5A4FCF] drop-shadow-md" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-success text-white rounded-full p-1.5 border-4 border-base-100 shadow-lg animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <h1 className="text-3xl font-black text-base-content mb-3 tracking-tight">
            {t("pages.auth.success.checkEmail")}
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            {t("pages.auth.success.hello")}{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#5A4FCF]">
              {userName}
            </span>
            {t("pages.auth.success.almostDone")}
          </p>

          <div className="w-full mb-8">
            <div className="bg-base-200/50 border border-base-300 rounded-2xl p-5 flex flex-col items-center gap-2 group transition-all hover:bg-base-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <span className="text-[10px] uppercase tracking-widest text-base-content/40 font-bold">
                {t("pages.auth.success.linkSentTo")}
              </span>
              <span className="text-lg font-bold text-base-content font-mono break-all">
                {userEmail}
              </span>
            </div>
          </div>

          <p className="text-sm text-base-content/50 mb-8 leading-relaxed max-w-xs mx-auto">
            {t("pages.auth.success.confirmationSent")}{" "}
            <strong>{t("pages.auth.success.spam")}</strong>.
          </p>

          <div className="w-full border-t border-base-200 pt-6">
            <Link
              className="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-primary hover:bg-primary/5 group w-full h-10 rounded-xl"
              to="/auth/signin"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t("pages.auth.success.backToLogin")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center z-10 opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-xs text-base-content/40">
          {t("pages.auth.success.didNotReceive")}{" "}
          <button
            className="text-primary hover:text-primary-focus font-bold bg-transparent border-none cursor-pointer p-0 transition-colors"
            type="button"
          >
            {t("pages.auth.success.resend")}
          </button>
        </p>
      </div>
    </>
  );
}
