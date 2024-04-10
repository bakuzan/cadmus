import db from './db';
import getStoredProceedure from './storedProceedures';
import { toBookViewModel, toBookInLibraryViewModel } from './mappers/books';

import { Book, BookInLibrary } from '@/types/Books';

/* DATEBASE READS */
export async function getBooks() {
  const query = getStoredProceedure('GetBooks');
  const items = db.prepare(query).all() as Book[];
  return items.map(toBookViewModel);
}

export async function getBookById(id: string) {
  const query = getStoredProceedure('GetBookById');
  const item = db.prepare(query).get(id) as BookInLibrary;
  return toBookInLibraryViewModel(item);
}

/* DATABASE WRITES */
export async function toggleBookInLibrary(bookId: string) {
  const record = db
    .prepare('SELECT * FROM Library WHERE BookId = ?')
    .get(bookId);

  const sql = record
    ? 'DELETE FROM Library WHERE BookId = ?'
    : 'INSERT INTO Library (BookId) VALUES (?)';

  const result = db.prepare(sql).run(bookId);
  return result.changes === 1;
}
