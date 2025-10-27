import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import "./app.css";
import CreateTodoCard from "./components/CreateTodoCard";
import Stats from "./components/Stats";
import SwitcherButtonGroup from "./components/SwitcherButtonGroup";
import TodoList from "./components/TodoList";
import Container from "./Container";
import Header from "./Header";
import { default as Layout } from "./Layout";
import { TodoFilters, useTodoStore } from "./store/todo";
import { capitalize } from "./util/util";

function App() {
  const {
    todos,
    createTodo,
    removeTodo,
    filtered,
    toggleTodo,
    filters,
    currentFilter,
    clearCompleted,
    setFilter,
    reorderTodos,
  } = useTodoStore();

  const filterButtons = useMemo(
    () =>
      filters.map(filterName => ({
        filterName,
        label: capitalize(filterName),
      })),
    [filters]
  );

  const currentFilterButton = useMemo(
    () => filterButtons.find(b => b.filterName == currentFilter)!,
    [currentFilter, filterButtons]
  );

  const onFilterButtonClick = useCallback(
    ({ filterName }: { filterName: string }) =>
      setFilter(filterName as keyof TodoFilters),
    [setFilter]
  );

  const isDesktop = useMediaQuery("(min-width: 48rem");

  const todosLeft = useMemo(
    () => todos.filter(todo => !todo.complete).length,
    [todos]
  );

  return (
    <Layout>
      <div className="py-12 xl:py-9">
        <Container>
          <Header className="mb-10 md:mb-12 " />
          <CreateTodoCard onTodoAdded={createTodo} className="mb-4 md:mb-6" />
          <div className="shadow-default rounded-[5px] dark:shadow-default-dark">
            <TodoList
              todos={filtered}
              onTodosReordered={reorderTodos}
              onTodoRemoved={removeTodo}
              onTodoToggled={toggleTodo}
            />
            {todos.length > 0 && (
              <Stats left={todosLeft} onClearComplete={clearCompleted}>
                {isDesktop && (
                  <SwitcherButtonGroup
                    onButtonClick={onFilterButtonClick}
                    current={currentFilterButton}
                    buttons={filterButtons}
                  />
                )}
              </Stats>
            )}
          </div>
          {!isDesktop && (
            <div
              className={clsx(
                "mt-4",
                "grid place-items-center py-4",
                "font-bold text-xs",
                "bg-card-bg text-card-tinted dark:bg-card-bg-dark dark:text-card-tinted-dark",
                "rounded-[5px]",
                "shadow-default dark:shadow-default-dark"
              )}
            >
              <SwitcherButtonGroup
                onButtonClick={onFilterButtonClick}
                current={currentFilterButton}
                buttons={filterButtons}
              />
            </div>
          )}
          {todos.length > 0 && (
            <p className="mt-10 text-center md:6">
              Drag and drop to reorder list
            </p>
          )}
        </Container>
      </div>
    </Layout>
  );
}

export default App;
