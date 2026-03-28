export function extractReorderPayload<T extends { bookId: number }>(
  items: T[],
  start = 1,
  step = 1000
) {
  return items.map((item, index) => ({
    bookId: item.bookId,
    position: (index + start) * step
  }));
}
