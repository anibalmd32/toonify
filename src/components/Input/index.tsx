import type { InputFieldProps } from "@/definitions/input";
import { useInput } from "@/hooks/useInput";
import { InputErrorList } from "./InputErrorList";
import { InputLabel } from "./InputLabel";
import { SelectInput } from "./inputs/SelectInput";
import { TextInput } from "./inputs/TextInput";

export const Input = ({
  label,
  type,
  options,
  placeholder = "",
}: InputFieldProps) => {
  const { errors, inputId, isTextInput, showError, field } = useInput({
    type,
  });

  return (
    <div className="form-control w-full group">
      <InputLabel inputId={inputId} label={label} />

      <div className="relative">
        {isTextInput && (
          <TextInput
            id={inputId}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
            showError={showError}
            type={type}
            value={field.state.value}
          />
        )}

        {type === "select" && (
          <SelectInput
            id={inputId}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            options={options}
            showError={showError}
            value={field.state.value}
          />
        )}
      </div>

      <div className="min-h-6 pt-1.5 ml-1">
        {showError && <InputErrorList errors={errors} />}
      </div>
    </div>
  );
};
