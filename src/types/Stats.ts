import { UncapitalizeObjectKeys } from './utils';

// Database models
export interface BookCountByYear {
  Year: number;
  Total: number;
  AverageDays: number;
}

export interface BookWithYearsAgo {
  BookId: number;
  Title: string;
  Author: string;
  StartDate: string;
  EndDate: string;
  YearsAgo: number;
  IsExact: number; // 1 or 0
}

// View models
export type BookCountByYearViewModel = UncapitalizeObjectKeys<BookCountByYear>;
export type BookWithYearsAgoViewModel = {
  bookId: number;
  title: string;
  author: string;
  startDate: string;
  endDate: string;
  yearsAgo: number;
  isExact: boolean;
};
