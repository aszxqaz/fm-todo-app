import clsx from "clsx";
import type { PropsWithChildren } from "react";

type StatsProps = {
  left: number;
  onClearComplete: () => void;
};

export default function Stats({
  left,
  onClearComplete,
  children,
}: PropsWithChildren<StatsProps>) {
  const ending = left == 1 ? "" : "s";
  const label = `${left} item${ending} left`;

  return (
    <div
      className={clsx(
        "grid auto-cols-fr grid-flow-col",
        "px-5 py-4 md:p-6",
        "bg-card-bg dark:bg-card-bg-dark"
      )}
    >
      <p>{label}</p>
      {children}
      <button
        onClick={onClearComplete}
        className={clsx(
          "justify-self-end cursor-pointer",
          "hover:text-body-hover hover:dark:text-body-hover-dark"
        )}
      >
        Clear Completed
      </button>
    </div>
  );
}
