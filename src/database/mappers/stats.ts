import { BookWithYearsAgo, BookWithYearsAgoViewModel } from '@/types/Stats';
import { UncapitalizeObjectKeys } from '@/types/utils';

export function toViewModel<T extends object>(item: T) {
  return Object.fromEntries(
    Object.entries(item).map(([k, v]) => [
      `${k.substring(0, 1).toLowerCase()}${k.substring(1)}`,
      v
    ])
  ) as UncapitalizeObjectKeys<T>;
}

export function toBookWithYearsAgoViewModel(
  item: BookWithYearsAgo
): BookWithYearsAgoViewModel {
  return {
    bookId: item.BookId,
    title: item.Title,
    author: item.Author,
    startDate: item.StartDate,
    endDate: item.EndDate,
    yearsAgo: item.YearsAgo,
    isExact: item.IsExact === 1
  };
}
