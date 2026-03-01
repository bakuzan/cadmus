import { HistoryDetailedViewModel } from './History';
import { UncapitalizeObjectKeys } from './utils';

// Database models
export interface BookCountByYear {
  Year: number;
  Total: number;
  AverageDays: number;
}

export interface RawBookHistoryRow {
  HistoryId: number;
  BookId: number;
  StartDate: string;
  EndDate: string | null;
  BookCount: number;
}

// Intermediate models
export interface PerYearCalcData {
  days: number;
  bookCount: number;
  repeatBookCount: number;
}

// View models
export type BookCountByYearViewModel = UncapitalizeObjectKeys<BookCountByYear>;

export type BookHistoryForPeriod = {
  period: string;
  bookCount: number;
  history: HistoryDetailedViewModel[];
};

export type PerYearStats = {
  total: number;
  averageDays: number;
  minDays: number;
  maxDays: number;
  repeats: number;
};
