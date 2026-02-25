import { UncapitalizeObjectKeys } from './utils';

// Database models
export interface BookCountByYear {
  Year: number;
  Total: number;
  AverageDays: number;
}

export interface RawBookHistoryRow {
  BookId: number;
  StartDate: string;
  EndDate: string | null;
  BookCount: number;
}

// View models
export type BookCountByYearViewModel = UncapitalizeObjectKeys<BookCountByYear>;
