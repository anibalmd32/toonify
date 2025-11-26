import clsx from "clsx";

export const INPUT_BASE_STYLES = clsx(
  "w-full transition-all duration-300 ease-out",
  "bg-base-100 border-2",
  "placeholder:text-base-content/30",
  "border-base-content/20 hover:border-base-content/40 focus:border-primary focus:shadow-[0_0_0_4px_rgba(90,79,207,0.1)]",
  "rounded-xl h-12",
);

export const INPUT_BASE_ERROR_STYLES = clsx("bg-error/5 focus:bg-base-100");
