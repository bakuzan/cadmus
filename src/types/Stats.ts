import { UncapitalizeObjectKeys } from './utils';

// Database models
export interface BookCountByYear {
  Year: number;
  Total: number;
  AverageDays: number;
}

// View models
export type BookCountByYearViewModel = UncapitalizeObjectKeys<BookCountByYear>;
