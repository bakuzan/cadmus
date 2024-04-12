import { History, HistoryViewModel } from '@/types/History';

export function toHistoryViewModel(history: History): HistoryViewModel {
  return {
    id: history.Id,
    bookId: history.BookId,
    startDate: history.StartDate,
    endDate: history.EndDate
  };
}
