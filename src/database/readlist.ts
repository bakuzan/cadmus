import db from './db';
import getStoredProceedure from './storedProceedures';

import { toViewModel } from './mappers';

import { ReadListHistory } from '@/types/ReadList';
import computeCyclePosition from './utils/computeCyclePosition';
import generateFutureCycle from './utils/generateFutureCycle';

// TODO : Move to db in a settings table configurable from UI
const REPEAT_CYCLE = 4; // 4th book must be re-read

/* DATEBASE READS */
export async function getReadList() {
  const queryGetHistory = getStoredProceedure('readlist_GetHistory');
  const oldRows = db
    .prepare(queryGetHistory)
    .all({ limit: REPEAT_CYCLE }) as ReadListHistory[];

  const queryUnread = getStoredProceedure('readlist_GetUnreadHistory');
  const unreadRows = db
    .prepare(queryUnread)
    .all({ limit: REPEAT_CYCLE }) as ReadListHistory[];

  const cyclePos = computeCyclePosition(oldRows, REPEAT_CYCLE);
  const futureRows = generateFutureCycle(
    cyclePos,
    REPEAT_CYCLE,
    unreadRows,
    [] as Array<ReadListHistory> // TODO source reread books from shortlist (TBI)
  );

  const last = oldRows.map(toViewModel);
  const next = futureRows.map(toViewModel).toReversed();

  return { last, next };
}
