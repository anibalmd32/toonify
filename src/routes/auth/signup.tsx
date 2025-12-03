import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AppLogo } from "@/components/AppLogo";
import { SignUpForm } from "@/forms/SignUpForm";
import { itn } from "@/lib/i18n";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: `${itn.t("pages.auth.register.tabTitle")} | Syntaxia`,
      },
    ],
  }),
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mb-8 space-y-2">
        <div className="flex justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
          <AppLogo className="h-16 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-base-content">
          {t("pages.auth.register.title")}
        </h1>
      </div>

      <div className="card bg-base-100/80 shadow-2xl border border-base-200 backdrop-blur-xl">
        <div className="card-body p-8">
          <SignUpForm />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-base-100 px-2 text-base-content/40 font-bold tracking-widest">
                O
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            <p className="text-base-content/70 font-medium">
              {t("pages.auth.register.alreadyAccount")}{" "}
              <Link
                className="link link-primary font-bold hover:text-primary-focus transition-all decoration-2 hover:decoration-4 underline-offset-4"
                to="/auth/signin"
              >
                {" "}
                {t("pages.auth.register.loginLink")}{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
