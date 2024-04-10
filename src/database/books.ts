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
