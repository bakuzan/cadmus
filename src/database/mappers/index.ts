import { UncapitalizeObjectKeys } from '@/types/utils';

export function toViewModel<T extends object>(item: T) {
  return Object.fromEntries(
    Object.entries(item).map(([k, v]) => [
      `${k.substring(0, 1).toLowerCase()}${k.substring(1)}`,
      v
    ])
  ) as UncapitalizeObjectKeys<T>;
}
