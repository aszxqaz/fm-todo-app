import { generateRandomID } from "../util/util";

export type Todo = {
  id: string;
  title: string;
  complete: boolean;
};

export function newTodo({
  title,
  complete,
}: {
  title: string;
  complete: boolean;
}) {
  const id = generateRandomID();
  const todo: Todo = {
    id,
    title,
    complete,
  };
  return todo;
}
