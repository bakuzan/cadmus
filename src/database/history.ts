import db from './db';
import getStoredProceedure from './storedProceedures';

import {
  toHistoryViewModel,
  toHistoryDetailedViewModel
} from './mappers/history';

import {
  History,
  HistoryUpdateRequest,
  HistoryDetailed
} from '@/types/History';

/* DATEBASE READS */
export async function getFullHistory() {
  const query = getStoredProceedure('GetFullHistory');
  const items = db.prepare(query).all() as HistoryDetailed[];
  return items.map(toHistoryDetailedViewModel);
}

export async function getHistoryByBookId(bookId: string) {
  const query = `
    SELECT * 
      FROM History 
     WHERE BookId = ?
     ORDER BY StartDate DESC`;

  const items = db.prepare(query).all(bookId) as History[];
  return items.map(toHistoryViewModel);
}

/* DATABASE WRITES */
export async function addReadHistory(bookId: string, startDate: string) {
  const sql = `
    INSERT INTO History (BookId, StartDate) 
    VALUES (:bookId, :startDate)`;

  const result = db.prepare(sql).run({ bookId, startDate });

  return result.changes === 1;
}

export async function updateReadHistory(update: HistoryUpdateRequest) {
  const sql = `
    UPDATE History
       SET StartDate = :startDate
         , EndDate = :endDate
     WHERE Id = :historyId`;

  const result = db.prepare(sql).run(update);

  return result.changes === 1;
}
