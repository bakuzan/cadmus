// Database model
export interface History {
  Id: number;
  BookId: number;
  StartDate: string;
  EndDate: string | null;
}

export interface HistoryDetailed {
  HistoryId: number;
  StartDate: string;
  EndDate: string | null;
  BookId: number;
  ISBN13: string;
  Title: string;
  Author: string;
  SeriesName: string | null;
}

// View model
export interface HistoryViewModel {
  id: number;
  bookId: number;
  startDate: string;
  endDate: string | null;
}

export interface HistoryDetailedViewModel {
  historyId: number;
  startDate: string;
  endDate: string | null;
  bookId: number;
  isbn13: string;
  title: string;
  author: string;
  seriesName: string | null;
}

// Requests
export interface HistoryUpdateRequest {
  historyId: string;
  startDate: string;
  endDate: string | null;
}
