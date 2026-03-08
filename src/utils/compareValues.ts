export type Direction = 'asc' | 'desc';

export interface Sort<T> {
  key: keyof T;
  direction: Direction;
}

export function universalCompare(a: unknown, b: unknown): number {
  // nullish first
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  // number
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  // boolean
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b);
  }

  // date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  // fallback: string compare
  return String(a).localeCompare(String(b));
}

export const makeSorter =
  <T extends Record<string, unknown>>(sort: {
    key: keyof T;
    direction: Direction;
  }) =>
  (a: T, b: T): number => {
    const x = a[sort.key];
    const y = b[sort.key];

    const result = universalCompare(x, y);
    return sort.direction === 'asc' ? result : -result;
  };
