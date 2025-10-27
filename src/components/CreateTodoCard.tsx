import { Button, Input } from "@headlessui/react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import Checkbox from "./Checkbox";

type CreateTodoCardProps = {
  onTodoAdded: (title: string, complete: boolean) => void;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export default function CreateTodoCard({
  onTodoAdded,
  className,
  ...props
}: CreateTodoCardProps) {
  const [state, setState] = useState({ title: "", complete: false });

  const canSubmit = useMemo(() => {
    return state.title.trim() != "";
  }, [state]);

  function setTodoComplete(complete: boolean) {
    setState(prev => ({ ...prev, complete }));
  }

  function addTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onTodoAdded(state.title, state.complete);
    setState({ title: "", complete: false });
  }

  return (
    <form
      className={clsx(
        "h-12 px-6 md:h-16",
        "flex items-center gap-4 md:gap-6",
        "bg-card-bg dark:bg-card-bg-dark shadow-default dark:shadow-default-dark",
        className
      )}
      {...props}
    >
      <Checkbox
        className="shrink-0"
        value={state.complete}
        onChange={setTodoComplete}
      />
      <Input
        autoFocus
        value={state.title}
        onChange={e => setState(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Create a new todo..."
        className={clsx(
          "flex-1",
          "text-xs leading-none tracking-[-0.25px] pt-[0.15em] md:text-lg",
          "whitespace-nowrap overflow-hidden text-ellipsis",
          "outline-0",
          "text-input placeholder:text-input-placeholder dark:text-input-dark dark:placeholder:text-input-placeholder-dark"
        )}
      />
      {canSubmit && (
        <Button
          type="submit"
          onClick={addTodo}
          disabled={state.title == ""}
          className="text-sm text-card-tinted cursor-pointer disabled:text-gray-300 dark:text-card-tinted-dark"
        >
          Add
        </Button>
      )}
    </form>
  );
}
