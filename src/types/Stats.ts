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
  Title: string;
  StartDate: string;
  EndDate: string | null;
  BookCount: number;
}

// Intermediate models
export interface PerYearCalcData {
  days: number;
  bookCount: number;
  repeatBookCount: number;
  title: string;
}

// View models
export type BookCountByYearViewModel = UncapitalizeObjectKeys<BookCountByYear>;

export type BookHistoryForPeriod = {
  period: string;
  bookCount: number;
  history: HistoryDetailedViewModel[];
};

export type PerYearMinMaxEntry = {
  days: number;
  title: string;
};

export type PerYearStats = {
  total: number;
  firstTimeReads: number;
  averageDays: number;
  medianDays: number;
  minDays: PerYearMinMaxEntry;
  maxDays: PerYearMinMaxEntry;
  repeats: number;
  repeatRatio: number;
  density: number;
  stdDev: number;
};

export type GroupedBookHistory = {
  bookId: number;
  title: string;
  author: string;
  isInLibrary: boolean;
  seriesName: string | null;
  entries: { start: string; end: string | null }[];
  repeatsCount: number;
  latestRepeatDate: string;
};
