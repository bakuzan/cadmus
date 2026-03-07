import { HistoryDetailed } from '@/types/History';
import { GroupedBookHistory } from '@/types/Stats';

export default function groupBookHistory(
  rows: HistoryDetailed[]
): GroupedBookHistory[] {
  const map = new Map<number, GroupedBookHistory>();

  for (const row of rows) {
    const start = row.StartDate;
    const end = row.EndDate;
    const existing = map.get(row.BookId);

    if (!existing) {
      map.set(row.BookId, {
        bookId: row.BookId,
        title: row.Title,
        author: row.Author,
        seriesName: row.SeriesName ?? null,
        repeatCount: 0,
        entries: [{ start, end }],
        latestRepeatDate: end ?? start
      });
    } else {
      existing.repeatCount++;
      existing.entries.push({ start, end });

      const candidateDate = end ?? start;
      if (candidateDate > existing.latestRepeatDate) {
        existing.latestRepeatDate = candidateDate;
      }
    }
  }

  return [...map.values()];
}
