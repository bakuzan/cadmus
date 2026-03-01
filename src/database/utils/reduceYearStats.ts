import {
  PerYearCalcData,
  PerYearMinMaxEntry,
  PerYearStats
} from '@/types/Stats';
import computeMedianDays from './computeMedianDays';
import computeStandardDeviation from './computeStandardDeviation';

export default function reduceYearStats(
  perYear: Record<string, PerYearCalcData[]>
) {
  const result: Record<string, PerYearStats> = {};

  for (const year of Object.keys(perYear)) {
    const rows = perYear[year];
    const dayValues: number[] = [];

    let totalBooks = 0;
    let totalRepeats = 0;
    let totalDays = 0;

    let minEntry: PerYearMinMaxEntry | null = null;
    let maxEntry: PerYearMinMaxEntry | null = null;

    for (const r of rows) {
      totalBooks += r.bookCount;
      totalRepeats += r.repeatBookCount;
      totalDays += r.days;
      dayValues.push(r.days);

      if (!minEntry || r.days < minEntry.days) {
        minEntry = { days: r.days, title: r.title };
      }
      if (!maxEntry || r.days > maxEntry.days) {
        maxEntry = { days: r.days, title: r.title };
      }
    }

    result[year] = {
      total: totalBooks,
      firstTimeReads: totalBooks - totalRepeats,
      repeats: totalRepeats,
      repeatRatio: Number((totalRepeats / totalBooks).toFixed(2)),
      averageDays: Math.round(totalDays / totalBooks),
      medianDays: computeMedianDays(dayValues),
      minDays: minEntry!,
      maxDays: maxEntry!,
      density: Number((totalDays / 365).toFixed(2)),
      stdDev: computeStandardDeviation(totalBooks, totalDays, dayValues)
    };
  }

  return result;
}
