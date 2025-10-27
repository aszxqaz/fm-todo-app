import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import clsx from "clsx";

type CheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "onChange" | "value"
>;

export default function Checkbox({
  value,
  onChange,
  className,
  ...props
}: CheckboxProps) {
  return (
    <HeadlessCheckbox
      checked={value}
      onChange={onChange}
      className={clsx(
        "group cursor-pointer",
        "w-5 h-5 md:w-6 md:h-6",
        "grid place-items-center",
        "rounded-full border border-checkbox dark:border-checkbox-dark",
        "data-checked:bg-linear-[-45deg] data-checked:from-gradient-light-end data-checked:to-gradient-light-start data-checked:border-none",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 11 9"
        className="w-2.5 opacity-0 group-data-checked:opacity-100 md:w-[11px] pt-px"
      >
        <path
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
          d="M1 4.304L3.696 7l6-6"
        />
      </svg>
    </HeadlessCheckbox>
  );
}
