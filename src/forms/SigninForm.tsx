import { useNavigate } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BRAND_BUTTON_CLASSES } from "@/definitions/stylesConstants/brandStyles";
import { RequiredSchema } from "@/definitions/validationSchemas/RequiredSchema";
import { useAppForm } from "@/hooks/useAppForm";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/stores/useToast";

export const SigninForm = () => {
  const [serverError, setServerError] = useState<string>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();

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
        onError: async (ctx) => {
          const errorCode = ctx.error.code;
          if (errorCode === "INVALID_EMAIL_OR_PASSWORD") {
            setServerError("Invalid credentials. Try again");
          }

          if (errorCode === "EMAIL_NOT_VERIFIED") {
            setServerError("Usuario no verificado");
            const res = await authClient.sendVerificationEmail({
              email: JSON.parse(ctx.request.body).email,
            });

            if (res.data?.status) {
              toast.showToast({
                message:
                  "Se enviado nuevamente el enlace de verificacion a tu email",
                variant: "success",
                duration: 10000,
              });
            }
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
          <TriangleAlert />
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
            name="email"
            validators={{
              onSubmit: RequiredSchema,
            }}
          >
            {(field) => (
              <field.Input
                label={t("inputs.email.label")}
                placeholder="name@example.com"
                type="email"
              />
            )}
          </form.AppField>

          <form.AppField
            name="password"
            validators={{
              onSubmit: RequiredSchema,
            }}
          >
            {(field) => (
              <field.Input
                label={t("inputs.password.label")}
                placeholder="••••••••"
                type="password"
              />
            )}
          </form.AppField>
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
