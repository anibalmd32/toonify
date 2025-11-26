import clsx from "clsx";
import {
  INPUT_BASE_ERROR_STYLES,
  INPUT_BASE_STYLES,
} from "@/definitions/stylesConstants/inputBaseStyles";
import { generateUniqueKey } from "@/utils/generateUniqueKey";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  showError: boolean;
  options: string[];
}

export const SelectInput = ({ options, ...props }: Props) => {
  return (
    <select
      autoComplete="off"
      className={clsx(
        INPUT_BASE_STYLES,
        "select",
        props.showError && `select-error ${INPUT_BASE_ERROR_STYLES}`,
      )}
      defaultValue={"Selecciona una opcion"}
      id={props.id}
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
    >
      <option disabled={true}>Selecciona una opcion</option>
      {options.map((opt, id) => (
        <option key={generateUniqueKey(id)}>{opt}</option>
      ))}
    </select>
  );
};
