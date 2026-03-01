import {
  PerYearCalcData,
  PerYearMinMaxEntry,
  PerYearStats
} from '@/types/Stats';

export default function reduceYearStats(
  perYear: Record<string, PerYearCalcData[]>
) {
  const result: Record<string, PerYearStats> = {};

  for (const year of Object.keys(perYear)) {
    const rows = perYear[year];

    let totalBooks = 0;
    let totalRepeats = 0;
    let totalDays = 0;

    let minEntry: PerYearMinMaxEntry | null = null;
    let maxEntry: PerYearMinMaxEntry | null = null;

    for (const r of rows) {
      totalBooks += r.bookCount;
      totalRepeats += r.repeatBookCount;
      totalDays += r.days;

      if (!minEntry || r.days < minEntry.days) {
        minEntry = { days: r.days, title: r.title };
      }
      if (!maxEntry || r.days > maxEntry.days) {
        maxEntry = { days: r.days, title: r.title };
      }
    }

    result[year] = {
      total: totalBooks,
      repeats: totalRepeats,
      averageDays: Math.round(totalDays / totalBooks),
      minDays: minEntry!,
      maxDays: maxEntry!
    };
  }

  return result;
}
