import db from './db';
import { toHistoryViewModel } from './mappers/history';

import { History, HistoryUpdateRequest } from '@/types/History';

/* DATEBASE READS */
export async function getReadHistory(bookId: string) {
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
