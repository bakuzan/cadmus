import {
  History,
  HistoryDetailed,
  HistoryViewModel,
  HistoryDetailedViewModel
} from '@/types/History';

export function toHistoryViewModel(history: History): HistoryViewModel {
  return {
    id: history.Id,
    bookId: history.BookId,
    startDate: history.StartDate,
    endDate: history.EndDate
  };
}

export function toHistoryDetailedViewModel(
  history: HistoryDetailed
): HistoryDetailedViewModel {
  return {
    historyId: history.HistoryId,
    startDate: history.StartDate,
    endDate: history.EndDate,
    bookId: history.BookId,
    isbn13: history.ISBN13,
    title: history.Title,
    author: history.Author,
    seriesName: history.SeriesName
  };
}
