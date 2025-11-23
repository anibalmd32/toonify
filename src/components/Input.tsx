import { useStore } from "@tanstack/react-form";
import clsx from "clsx";
import type React from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { useFieldContext } from "@/hooks/useFormContext";
import { generateUniqueKey } from "@/utils/generateUniqueKey";
import { ErrorSvg } from "./ErrorSvg";

interface BaseInputProps {
  label: string;
  placeholder?: string;
}

interface SelectInputProps extends BaseInputProps {
  type: "select";
  options: string[];
}

interface TextInputProps extends BaseInputProps {
  type: "text" | "password" | "email";
  options?: never;
}

export type InputFieldProps = SelectInputProps | TextInputProps;

export const Input = ({
  label,
  type,
  options,
  placeholder = "",
}: InputFieldProps) => {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const { t } = useTranslation();
  const inputId = useId();

  const isValid = field.state.meta.isValid;
  const isTouched = field.state.meta.isTouched;
  const showError = !isValid && isTouched && errors.length > 0;

  const isTextInput =
    type === "email" || type === "password" || type === "text";
  const classByInputType = {
    select: {
      base: "select",
      onError: "select-error",
    },
    text: {
      base: "input",
      onError: "input-error",
    },
  };

  const baseClasses = () =>
    clsx(
      isTextInput ? classByInputType.text.base : classByInputType.select.base,
      "w-full transition-all duration-300 ease-out",
      "bg-base-100 border-2",
      "placeholder:text-base-content/30",
      "border-base-content/20 hover:border-base-content/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(90,79,207,0.1)]",
      "rounded-xl h-12",
    );
  const onErrorClasses = () =>
    clsx(
      isTextInput
        ? classByInputType.text.onError
        : classByInputType.select.onError,
      "bg-error/5 focus:bg-base-100",
    );

  const inputClassNames = () =>
    clsx(baseClasses(), showError && onErrorClasses());

  return (
    <div className="form-control w-full group">
      <label className="label pb-1.5" htmlFor={inputId}>
        <span className="label-text font-semibold text-base-content/70 ml-1 transition-colors group-focus-within:text-primary">
          {label}
        </span>
      </label>

      <div className="relative">
        {isTextInput && (
          <TextInput
            className={inputClassNames()}
            id={inputId}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            value={field.state.value}
          />
        )}

        {type === "select" && (
          <SelectInput
            options={options}
            props={{
              className: inputClassNames(),
              id: inputId,
              onBlur: field.handleBlur,
              onChange: (e) => field.handleChange(e.target.value),
              value: field.state.value,
            }}
          />
        )}
      </div>

      <div className="min-h-6 pt-1.5 ml-1">
        {showError && (
          <div className="flex flex-col animate-fade-in-down">
            {errors.map((error, idx) => (
              <span
                className="text-xs text-error font-medium flex items-center gap-1.5"
                key={idx}
                role="alert"
              >
                <ErrorSvg />
                {t(error?.message ?? error)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      autoComplete="off"
      className={`${props.className}`}
      id={props.id}
      onBlur={props.onBlur}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
    />
  );
};

const SelectInput = ({
  options,
  props,
}: {
  options: string[];
  props: React.SelectHTMLAttributes<HTMLSelectElement>;
}) => {
  return (
    <select
      autoComplete="off"
      className={`select ${props.className}`}
      defaultValue={"Selecciona una opcion"}
      id={props.id}
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
    >
      <option disabled={true}>Selecciona una opcion</option>
      {options.map((opt) => (
        <option key={generateUniqueKey()}>{opt}</option>
      ))}
    </select>
  );
};
