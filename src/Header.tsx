import clsx from "clsx";
import logoSvg from "./assets/icons/logo.svg";
import ThemeSwitcher, { useTheme } from "./components/ThemeSwitcher";

type HeaderProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Header({ className, ...props }: HeaderProps) {
  const { toggleMode, mode } = useTheme();

  return (
    <div
      className={clsx("flex items-center justify-between", className)}
      {...props}
    >
      <div className="w-27 md:w-40">
        <img className="select-none" src={logoSvg} alt="Todo App Logo" />
      </div>
      <ThemeSwitcher mode={mode} onToggle={toggleMode} />
    </div>
  );
}
