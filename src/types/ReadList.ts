import { HistoryDetailed } from './History';
import { UncapitalizeObjectKeys } from './utils';

// Database model
export interface ReadListHistory extends Omit<
  HistoryDetailed,
  'BookCount' | 'RepeatShortlistId'
> {
  ReadNumber: number;
}

// View Models
export type ReadListHistoryViewModel = UncapitalizeObjectKeys<ReadListHistory>;
