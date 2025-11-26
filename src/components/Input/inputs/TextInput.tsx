import clsx from "clsx";
import {
  INPUT_BASE_ERROR_STYLES,
  INPUT_BASE_STYLES,
} from "@/definitions/stylesConstants/inputBaseStyles";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  showError: boolean;
}

export const TextInput = (props: Props) => {
  return (
    <input
      autoComplete="off"
      className={clsx(
        INPUT_BASE_STYLES,
        "input",
        props.showError && `input-error ${INPUT_BASE_ERROR_STYLES}`,
      )}
      id={props.id}
      onBlur={props.onBlur}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
    />
  );
};
