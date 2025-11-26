import { TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { generateUniqueKey } from "@/utils/generateUniqueKey";

export const InputErrorList = ({
  errors,
}: {
  errors: Record<string, string>[] | string[];
}) => {
  const { t } = useTranslation();
  const errorMessages = errors.map((error) => {
    if (typeof error === "string") {
      return error;
    }
    return error.message;
  });

  return (
    <div className="flex flex-col animate-fade-in-down">
      {errorMessages.map((message, index) => (
        <span
          className="text-xs text-error font-medium flex items-center gap-1.5"
          key={generateUniqueKey(index)}
          role="alert"
        >
          <TriangleAlert />
          {t(message)}
        </span>
      ))}
    </div>
  );
};
