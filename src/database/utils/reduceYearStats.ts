export default function reduceYearStats(
  perYear: Record<string, { days: number; bookCount: number }[]>
) {
  const result: Record<
    string,
    {
      total: number;
      averageDays: number;
      minDays: number;
      maxDays: number;
    }
  > = {};

  for (const year of Object.keys(perYear)) {
    const rows = perYear[year];

    let totalBooks = 0;
    let totalDaysWeighted = 0;
    let minDays = Infinity;
    let maxDays = -Infinity;

    for (const r of rows) {
      totalBooks += r.bookCount;
      totalDaysWeighted += r.days;

      if (r.days < minDays) {
        minDays = r.days;
      }
      if (r.days > maxDays) {
        maxDays = r.days;
      }
    }

    result[year] = {
      total: totalBooks,
      averageDays: Math.round(totalDaysWeighted / totalBooks),
      minDays,
      maxDays
    };
  }

  return result;
}
