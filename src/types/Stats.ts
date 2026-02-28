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
  StartDate: string;
  EndDate: string | null;
  BookCount: number;
}

// View models
export type BookCountByYearViewModel = UncapitalizeObjectKeys<BookCountByYear>;

export type BookHistoryForPeriod = {
  period: string;
  history: HistoryDetailedViewModel[];
};
