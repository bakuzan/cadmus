import db from './db';

/* DATEBASE READS */

/* DATABASE WRITES */
export async function addReadHistory(bookId: string, startDate: string) {
  const sql = `
    INSERT INTO History (BookId, StartDate) 
    VALUES (:bookId, :startDate)`;

  const result = db.prepare(sql).run({ bookId, startDate });

  return result.changes === 1;
}
