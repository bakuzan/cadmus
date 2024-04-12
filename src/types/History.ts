// Database model
export interface History {
  Id: number;
  BookId: number;
  StartDate: string;
  EndDate: string | null;
}

// View model
export interface HistoryViewModel {
  id: number;
  bookId: number;
  startDate: string;
  endDate: string | null;
}

// Requests
export interface HistoryUpdateRequest {
  historyId: string;
  startDate: string;
  endDate: string | null;
}
