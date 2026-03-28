import db from './db';
import getStoredProceedure from './storedProceedures';

import { ReadListHistory } from '@/types/ReadList';

import { getSettings } from '@/database/settings';
import { toViewModel } from '@/database/mappers';
import computeCyclePosition from '@/database/utils/computeCyclePosition';
import generateFutureCycle from '@/database/utils/generateFutureCycle';

/* DATEBASE READS */
async function getRawRepeatShortlist() {
  const query = getStoredProceedure('readlist_GetRepeatShortlist');
  return db.prepare(query).all() as ReadListHistory[];
}

export async function getReadList() {
  const settings = getSettings();
  const REPEAT_CYCLE = settings.readList_RepeatFrequency;

  const queryGetHistory = getStoredProceedure('readlist_GetHistory');
  const oldRows = db
    .prepare(queryGetHistory)
    .all({ limit: REPEAT_CYCLE }) as ReadListHistory[];

  const queryUnread = getStoredProceedure('readlist_GetUnreadHistory');
  const unreadRows = db
    .prepare(queryUnread)
    .all({ limit: REPEAT_CYCLE }) as ReadListHistory[];

  const rawShortlist = await getRawRepeatShortlist();

  const cyclePos = computeCyclePosition(oldRows, REPEAT_CYCLE);
  const futureRows = generateFutureCycle(
    cyclePos,
    REPEAT_CYCLE,
    unreadRows,
    rawShortlist
  );

  const last = oldRows.map(toViewModel);
  const next = futureRows.map(toViewModel).toReversed();
  const unread = unreadRows.map(toViewModel);
  const shortlist = rawShortlist.map(toViewModel);

  return { last, next, shortlist, unread };
}

/* DATEBASE WRITES */
export async function removeBookIfInRepeatShortlist(bookId: string) {
  const record = db
    .prepare('SELECT * FROM RepeatShortlist WHERE BookId = ?')
    .get(bookId);

  if (!record) {
    // No record, counts as removed!
    return true;
  }

  const result = db
    .prepare('DELETE FROM RepeatShortlist WHERE BookId = ?')
    .run(bookId);

  return result.changes === 1;
}

export async function toggleBookInRepeatShortlist(bookId: string) {
  const record = db
    .prepare('SELECT * FROM RepeatShortlist WHERE BookId = ?')
    .get(bookId);

  const sql = record
    ? 'DELETE FROM RepeatShortlist WHERE BookId = ?'
    : `INSERT INTO RepeatShortlist (BookId, Position)
      VALUES (?, (SELECT COALESCE(MAX(Position), 0) + 1000 FROM RepeatShortlist))`;

  const result = db.prepare(sql).run(bookId);
  return result.changes === 1;
}

export async function reorderRepeatShortlist(
  rows: Array<{ bookId: number; position: number }>
) {
  const update = db.prepare(`
    UPDATE RepeatShortlist
    SET Position = ?
    WHERE BookId = ?
  `);

  const tx = db.transaction((rows) => {
    for (const row of rows) {
      update.run(row.position, row.bookId);
    }
  });

  tx(rows);

  return true;
}
