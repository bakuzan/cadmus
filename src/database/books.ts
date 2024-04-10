import db from './db';
import getStoredProceedure from './storedProceedures';
import { toBookViewModel } from './mappers/books';

import { Book } from '@/types/Books';

/* DATEBASE READS */
export async function getBooks() {
  const query = getStoredProceedure('GetBooks');
  const items = db.prepare(query).all() as Book[];
  return items.map(toBookViewModel);
}
