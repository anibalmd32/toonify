import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import * as v from "valibot";
import { BRAND_BUTTON_CLASSES } from "@/definitions/stylesConstants/brandStyles";
import { EmailSchema } from "@/definitions/validationSchemas/EmailSchema";
import { NameSchema } from "@/definitions/validationSchemas/NameSchema";
import {
  createConfirmPasswordSchema,
  PasswordSchema,
} from "@/definitions/validationSchemas/PasswordSchema";
import { useAppForm } from "@/hooks/useAppForm";
import { authClient } from "@/lib/auth-client";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value, formApi }) => {
      console.log(formApi.state.errors);
      await authClient.signUp.email(value, {
        onSuccess: (ctx) => {
          navigate({
            to: "/auth/signup-success",
            search: {
              userName: ctx.data.user.name,
              userEmail: ctx.data.user.email,
            },
          });
        },
        onError: (ctx) => {
          console.log("Error en registro: ", ctx.error);
        },
      });
    },
  });

  return (
    <div className="w-full">
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="name"
          validators={{
            onSubmit: NameSchema,
          }}
        >
          {(field) => (
            <field.Input
              label={t("inputs.name.label")}
              placeholder="Ej: Juan Pérez"
              type="text"
            />
          )}
        </form.AppField>
        <form.AppField
          name="email"
          validators={{
            onSubmit: EmailSchema,
          }}
        >
          {(field) => (
            <field.Input
              label={t("inputs.email.label")}
              placeholder="nombre@ejemplo.com"
              type="email"
            />
          )}
        </form.AppField>
        <form.AppField
          name="password"
          validators={{
            onSubmit: PasswordSchema,
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
        <form.AppField
          name="confirmPassword"
          validators={{
            onSubmit: ({ value, fieldApi }) => {
              const passwordToMatch = fieldApi.form.getFieldValue("password");
              const ConfirmSchema =
                createConfirmPasswordSchema(passwordToMatch);
              const result = v.safeParse(ConfirmSchema, value);
              if (!result.success) {
                return result.issues[0].message;
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <field.Input
              label={t("inputs.confirmPassword.label")}
              placeholder="••••••••"
              type="password"
            />
          )}
        </form.AppField>

        <div className="mt-8">
          <form.AppForm>
            <form.FormButton
              className={BRAND_BUTTON_CLASSES}
              label={t("buttons.register.label")}
            />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
};
