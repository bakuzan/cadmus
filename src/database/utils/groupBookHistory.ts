import { HistoryDetailedWithLibraryId } from '@/types/History';
import { GroupedBookHistory } from '@/types/Stats';

export default function groupBookHistory(
  rows: HistoryDetailedWithLibraryId[]
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
        isInLibrary: !!row.LibraryId,
        seriesName: row.SeriesName ?? null,
        entries: [{ start, end }],
        repeatsCount: 0,
        latestRepeatDate: end ?? start
      });
    } else {
      existing.entries.push({ start, end });
      existing.repeatsCount++;

      const candidateDate = end ?? start;
      if (candidateDate > existing.latestRepeatDate) {
        existing.latestRepeatDate = candidateDate;
      }
    }
  }

  return [...map.values()];
}
