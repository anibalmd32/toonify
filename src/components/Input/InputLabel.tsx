export const InputLabel = ({
  label,
  inputId,
}: {
  label: string;
  inputId: string;
}) => {
  return (
    <label className="label pb-1.5" htmlFor={inputId}>
      <span className="label-text font-semibold text-base-content/70 ml-1 transition-colors group-focus-within:text-primary">
        {label}
      </span>
    </label>
  );
};
