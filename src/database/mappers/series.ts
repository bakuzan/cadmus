import { Book } from '@/types/Books';
import {
  Series,
  SeriesViewModel,
  SeriesWithBooksViewModel
} from '@/types/Series';

export function toSeriesViewModel(series: Series): SeriesViewModel {
  return {
    id: series.Id,
    name: series.Name
  };
}

export function toSeriesWithBooksViewModel(
  series: Series,
  books: Book[]
): SeriesWithBooksViewModel {
  return {
    ...toSeriesViewModel(series),
    books: books.map((b) => ({
      id: b.Id,
      title: b.Title
    }))
  };
}
