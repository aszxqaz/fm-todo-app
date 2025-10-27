import { useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { newTodo, type Todo } from "../models/todo";
import initialData from "./todo-data.json";
import { updated } from "./util/id_util";

export type TodoFilter = (todos: Todo[]) => Todo[];

export type TodoFilters = {
  all: TodoFilter;
  completed: TodoFilter;
  active: TodoFilter;
};

export const TodoFilters: TodoFilters = {
  all: todos => todos,
  active: todos => todos.filter(t => !t.complete),
  completed: todos => todos.filter(t => t.complete),
};

export function useTodoStore() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    "todos",
    initialData.map(newTodo)
  );

  const [filter, setFilter] = useState<keyof TodoFilters>("all");

  const filtered = useMemo(() => {
    return TodoFilters[filter](todos);
  }, [todos, filter]);

  function toggleTodo(id: string) {
    setTodos(
      updated(todos, id, todo => ({ ...todo, complete: !todo.complete }))
    );
  }

  function removeTodo(id: string) {
    setTodos(todos.filter(todo => todo.id != id));
  }

  function createTodo(title: string, complete: boolean) {
    const todo = newTodo({ title, complete });
    setTodos([todo, ...todos]);
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.complete));
  }

  function reorderTodos(ordered: Todo[]) {
    const newTodos = todos.map(todo => {
      const index = filtered.indexOf(todo);
      if (index == -1) return todo;
      return ordered[index];
    });
    setTodos(newTodos);
  }

  return {
    todos,
    filtered,
    createTodo,
    removeTodo,
    toggleTodo,
    currentFilter: filter,
    filters: Object.keys(TodoFilters),
    setFilter,
    clearCompleted,
    reorderTodos,
  };
}
