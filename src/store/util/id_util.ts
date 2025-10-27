type WithId = {
  id: string;
};

type UpdateFn<T extends WithId> = (item: T) => T;

export function updated<T extends WithId>(
  items: T[],
  id: string,
  updateFn: UpdateFn<T>
) {
  const index = mustFindIndex(items, id);
  const newItem = updateFn(items[index]);
  return [...items.slice(0, index), newItem, ...items.slice(index + 1)];
}

export function updatedAt<T extends WithId>(
  items: T[],
  index: number,
  updateFn: UpdateFn<T>
) {
  const newItem = updateFn(items[index]);
  return [...items.slice(0, index), newItem, ...items.slice(index + 1)];
}

function mustFindIndex<T extends WithId>(items: T[], id: string): number {
  const index = items.findIndex(item => item.id == id);
  if (index == -1) {
    throw new Error(`Item with id ${id} not found`);
  }
  return index;
}
