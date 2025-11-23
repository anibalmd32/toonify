import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorSvg } from "@/components/ErrorSvg";
import { BRAND_BUTTON_CLASSES } from "@/definitions/styles/brandStyles";
import { RequiredSchema } from "@/definitions/validationSchemas/RequiredSchema";
import { useAppForm } from "@/hooks/useAppForm";
import { authClient } from "@/lib/auth-client";

export const SigninForm = () => {
  const [serverError, setServerError] = useState<string>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(value, {
        onSuccess: () => {
          navigate({
            to: "/app/home",
          });
        },
        onError: (ctx) => {
          const errorCode = ctx.error.code;
          if (errorCode === "INVALID_EMAIL_OR_PASSWORD") {
            setServerError("Invalid credentials. Try again");
          }
        },
      });
    },
  });

  return (
    <div className="w-full">
      {serverError && (
        <div
          className="alert alert-error shadow-sm mb-6 p-3 rounded-lg text-white/90 text-sm flex items-center gap-2"
          role="alert"
        >
          <ErrorSvg />
          <span>{serverError}</span>
        </div>
      )}

      <form
        className="flex flex-col w-full gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.AppField
            children={(field) => (
              <field.Input
                label={t("inputs.email.label")}
                placeholder="name@example.com"
                type="email"
              />
            )}
            name="email"
            validators={{
              onSubmit: RequiredSchema,
            }}
          />

          <form.AppField
            children={(field) => (
              <field.Input
                label={t("inputs.password.label")}
                placeholder="••••••••"
                type="password"
              />
            )}
            name="password"
            validators={{
              onSubmit: RequiredSchema,
            }}
          />
        </div>

        <div className="mt-8">
          <form.AppForm>
            <form.FormButton
              className={BRAND_BUTTON_CLASSES}
              label={t("buttons.login.label")}
            />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
};
