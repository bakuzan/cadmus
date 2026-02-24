import db from './db';
import getStoredProceedure from './storedProceedures';

import { BookCountByYear } from '@/types/Stats';
import { toViewModel } from '@/database/mappers/stats';

/* DATEBASE READS */
export async function getBookCountByYear() {
  const query = getStoredProceedure('stats_GetBookCountByYear');
  const counts = db.prepare(query).all() as BookCountByYear[];
  return counts.map(toViewModel);
}
