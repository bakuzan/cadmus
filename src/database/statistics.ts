import db from './db';
import getStoredProceedure from './storedProceedures';

import { BookCountByYear } from '@/types/Stats';
import { UncapitalizeObjectKeys } from '@/types/utils';

function toViewModel<T extends object>(item: T) {
  return Object.fromEntries(
    Object.entries(item).map(([k, v]) => [
      `${k.substring(0, 1).toLowerCase()}${k.substring(1)}`,
      v
    ])
  ) as UncapitalizeObjectKeys<T>;
}

/* DATEBASE READS */
export async function getBookCountByYear() {
  const query = getStoredProceedure('stats_GetBookCountByYear');
  const counts = db.prepare(query).all() as BookCountByYear[];
  return counts.map(toViewModel);
}
