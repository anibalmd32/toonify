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
