import clsx from "clsx";

type Button = {
  label: string;
};

type SwitcherButtonGroupProps<B extends Button> = {
  current: B;
  buttons: B[];
  onButtonClick: (b: B) => void;
};

export default function SwitcherButtonGroup<B extends Button>({
  current,
  buttons,
  onButtonClick,
}: SwitcherButtonGroupProps<B>) {
  return (
    <div className="flex gap-4">
      {buttons.map(filter => {
        const isActive = current == filter;
        return (
          <button
            key={filter.label}
            onClick={isActive ? undefined : () => onButtonClick(filter)}
            className={clsx(
              isActive
                ? "text-accent"
                : "hover:text-card-tinted-hover hover:dark:text-card-tinted-hover-dark",
              "font-bold cursor-pointer"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
