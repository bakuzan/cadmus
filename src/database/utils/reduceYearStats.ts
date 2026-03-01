import { PerYearCalcData, PerYearStats } from '@/types/Stats';

export default function reduceYearStats(
  perYear: Record<string, PerYearCalcData[]>
) {
  const result: Record<string, PerYearStats> = {};

  for (const year of Object.keys(perYear)) {
    const rows = perYear[year];

    let totalBooks = 0;
    let totalRepeats = 0;
    let totalDays = 0;
    let minDays = Infinity;
    let maxDays = -Infinity;

    for (const r of rows) {
      totalBooks += r.bookCount;
      totalRepeats += r.repeatBookCount;
      totalDays += r.days;

      if (r.days < minDays) {
        minDays = r.days;
      }
      if (r.days > maxDays) {
        maxDays = r.days;
      }
    }

    result[year] = {
      total: totalBooks,
      repeats: totalRepeats,
      averageDays: Math.round(totalDays / totalBooks),
      minDays,
      maxDays
    };
  }

  return result;
}
