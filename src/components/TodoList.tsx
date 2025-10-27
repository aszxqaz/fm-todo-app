import clsx from "clsx";
import { Reorder } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { Todo } from "../models/todo";
import { TodoCard } from "./TodoCard";

type TodoListProps = {
  todos: Todo[];
  onTodoRemoved: (id: string) => void;
  onTodoToggled: (id: string) => void;
  onTodosReordered: (ordered: Todo[]) => void;
};

export default function TodoList({
  todos,
  onTodoRemoved,
  onTodoToggled,
  onTodosReordered,
}: TodoListProps) {
  const parentRef = useRef<HTMLUListElement>(null);

  const [dragging, setDragging] = useState(true);

  const itemTransition = useMemo(() => {
    return { duration: dragging ? 0.2 : 0 };
  }, [dragging]);

  const dragTransition = useRef({ bounceStiffness: 900 });

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const onDragEnd = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  console.log(todos);

  return (
    <Reorder.Group
      axis={"y"}
      values={todos}
      onReorder={onTodosReordered}
      className={clsx()}
      ref={parentRef}
    >
      {todos.map(todo => {
        return (
          <Reorder.Item
            key={todo.id}
            dragConstraints={parentRef}
            dragElastic={0.2}
            dragTransition={dragTransition.current}
            value={todo}
            className="relative border-b border-todolist-separator dark:border-todolist-separator-dark"
            initial={false}
            transition={itemTransition}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <TodoCard
              todo={todo}
              onTodoToggled={onTodoToggled}
              onTodoRemoved={onTodoRemoved}
            />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
