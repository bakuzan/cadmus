import db from './db';
import getStoredProceedure from './storedProceedures';

import { BookCountByYear, BookWithYearsAgo } from '@/types/Stats';
import {
  toViewModel,
  toBookWithYearsAgoViewModel
} from '@/database/mappers/stats';

/* DATEBASE READS */
export async function getBookCountByYear() {
  const query = getStoredProceedure('stats_GetBookCountByYear');
  const counts = db.prepare(query).all() as BookCountByYear[];
  return counts.map(toViewModel);
}

export async function getBooksWithYearsAgo() {
  const query = getStoredProceedure('stats_GetBooksWithYearsAgo');
  const counts = db.prepare(query).all() as BookWithYearsAgo[];
  return counts.map(toBookWithYearsAgoViewModel);
}
