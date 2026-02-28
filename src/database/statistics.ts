import db from './db';
import getStoredProceedure from './storedProceedures';

import { HistoryDetailed } from '@/types/History';
import { BookCountByYear, RawBookHistoryRow } from '@/types/Stats';
import { toHistoryDetailedViewModel } from '@/database/mappers/history';
import { toViewModel } from '@/database/mappers/stats';

import expandMonths from '@/database/utils/expandMonths';
import getOverlapDays from '@/database/utils/getOverlapDays';
import allocateWholeBooks from '@/database/utils/allocateWholeBooks';

/* DATEBASE READS */
export async function getBookCountByYear() {
  const query = getStoredProceedure('stats_GetBookCountByYear');
  const counts = db.prepare(query).all() as BookCountByYear[];
  return counts.map(toViewModel);
}

export async function getBookHistoryMonthCounts() {
  const query = getStoredProceedure('stats_GetRawBookHistoryRows');
  const rows = db.prepare(query).all() as RawBookHistoryRow[];
  const monthBooks: Record<string, number[]> = {};

  for (const row of rows) {
    const start = new Date(row.StartDate);
    const end = row.EndDate ? new Date(row.EndDate) : new Date();
    const bookCount = row.BookCount;

    const months = expandMonths(start, end);
    const monthDurations = months
      .map((m) => ({ month: m, days: getOverlapDays(start, end, m) }))
      .filter((x) => x.days > 0);

    const ensure = (m: string) => (monthBooks[m] ??= []);

    if (bookCount === 1) {
      // Majority month gets the full count
      const maxDays = Math.max(...monthDurations.map((x) => x.days));
      const winner = monthDurations.find((x) => x.days === maxDays)!;
      ensure(winner.month).push(row.HistoryId);
      continue;
    }

    // BookCount > 1 → proportional whole-book allocation
    const allocations = allocateWholeBooks(monthDurations, bookCount);
    for (const a of allocations) {
      if (a.value > 0) {
        const bucket = ensure(a.month);
        bucket.push(...Array(a.value).fill(row.HistoryId));
      }
    }
  }

  return monthBooks;
}

export async function getBookHistoryForPeriod(historyIds: number[]) {
  const sqlTemplate = getStoredProceedure('stats_GetBookHistoryForPeriod');

  const placeholders = historyIds.map(() => '?').join(',');
  const query = sqlTemplate.replace(':historyIds', placeholders);
  const items = db.prepare(query).all(...historyIds) as HistoryDetailed[];

  return items.map(toHistoryDetailedViewModel);
}
