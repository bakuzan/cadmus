import db from './db';
import getStoredProceedure from './storedProceedures';

import { HistoryDetailed } from '@/types/History';
import { RawBookHistoryRow } from '@/types/Stats';
import { toHistoryDetailedViewModel } from '@/database/mappers/history';

import expandMonths from '@/database/utils/expandMonths';
import getOverlapDays from '@/database/utils/getOverlapDaysInMonth';
import allocateWholeBooks from '@/database/utils/allocateWholeBooks';
import expandYears from './utils/expandYears';
import getOverlapDaysInYear from './utils/getOverlapDaysInYear';
import reduceYearStats from './utils/reduceYearStats';

/* DATEBASE READS */
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
      .map((m) => ({ key: m, days: getOverlapDays(start, end, m) }))
      .filter((x) => x.days > 0);

    const ensure = (m: string) => (monthBooks[m] ??= []);

    if (bookCount === 1) {
      // Majority month gets the full count
      const maxDays = Math.max(...monthDurations.map((x) => x.days));
      const winner = monthDurations.find((x) => x.days === maxDays)!;
      ensure(winner.key).push(row.HistoryId);
      continue;
    }

    // BookCount > 1 → proportional whole-book allocation
    const allocations = allocateWholeBooks(monthDurations, bookCount);
    for (const a of allocations) {
      if (a.value > 0) {
        const bucket = ensure(a.key);
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

export async function getBookHistoryYearStats() {
  const query = getStoredProceedure('stats_GetRawBookHistoryRows');
  const rows = db.prepare(query).all() as RawBookHistoryRow[];

  const perYear: Record<string, { days: number; bookCount: number }[]> = {};

  for (const row of rows) {
    const start = new Date(row.StartDate);
    const end = row.EndDate ? new Date(row.EndDate) : new Date();
    const years = expandYears(start, end);

    // Build durations per year
    const yearDurations = years
      .map((y) => ({
        key: String(y),
        days: getOverlapDaysInYear(start, end, y)
      }))
      .filter((x) => x.days > 0);

    if (yearDurations.length === 0) {
      continue;
    }

    // Allocate whole books across years based on days
    const allocations = allocateWholeBooks(yearDurations, row.BookCount);

    for (const a of allocations) {
      if (a.value <= 0) {
        continue;
      }

      const yd = yearDurations.find((d) => d.key === a.key)!;

      (perYear[a.key] ??= []).push({
        days: yd.days,
        bookCount: a.value
      });
    }
  }

  return reduceYearStats(perYear);
}
