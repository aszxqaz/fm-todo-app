import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import { useCallback } from "react";
import type { Todo } from "../models/todo";
import Checkbox from "./Checkbox";

type TodoCardProps = {
  todo: Todo;
  onTodoToggled: (id: string) => void;
  onTodoRemoved: (id: string) => void;
};

export function TodoCard({
  onTodoToggled,
  onTodoRemoved,
  todo,
}: TodoCardProps) {
  const toggleTodo = useCallback(() => {
    onTodoToggled(todo.id);
  }, [todo]);

  const removeTodo = useCallback(() => {
    onTodoRemoved(todo.id);
  }, [todo]);

  return (
    <div
      className={clsx(
        "h-13 px-5 md:h-18 md:px-6",
        "flex items-center gap-4 md:gap-6",
        "bg-card-bg dark:bg-card-bg-dark"
      )}
    >
      <Field className="flex-1 flex items-center gap-4 md:gap-6">
        <Checkbox
          className="shrink-0"
          value={todo.complete}
          onChange={toggleTodo}
        />
        <Label
          passive
          className={clsx(
            "flex-1",
            "text-xs leading-none tracking-[-0.25px] pt-[0.15em] md:text-lg",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            todo.complete
              ? "line-through text-card-complete dark:text-card-complete-dark"
              : "text-card dark:text-card-dark"
          )}
        >
          {todo.title}
        </Label>
      </Field>
      <button
        className={clsx(
          "shrink-0 -mr-1",
          "w-8 h-8 grid place-items-center",
          "cursor-pointer"
        )}
        onClick={removeTodo}
      >
        <svg
          className={clsx(
            "w-3 h-3 md:w-4.5 md:h-4.5",
            "text-card-cross dark:text-card-cross-dark"
          )}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
}
