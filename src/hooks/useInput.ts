import { useStore } from "@tanstack/react-form";
import { useId } from "react";
import { useFieldContext } from "@/hooks/useFormContext";

export const useInput = ({
  type,
}: {
  type: "text" | "password" | "email" | "select";
}) => {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const inputId = useId();

  const isValid = field.state.meta.isValid;
  const isTouched = field.state.meta.isTouched;
  const showError = !isValid && isTouched && errors.length > 0;
  const isTextInput =
    type === "email" || type === "password" || type === "text";

  return {
    inputId,
    showError,
    isValid,
    isTouched,
    errors,
    isTextInput,
    field,
  };
};
