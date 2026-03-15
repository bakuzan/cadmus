import db from './db';
import getStoredProceedure from './storedProceedures';

import { ReadListHistory } from '@/types/ReadList';

import { getSettings } from '@/database/settings';
import { toViewModel } from '@/database/mappers';
import computeCyclePosition from '@/database/utils/computeCyclePosition';
import generateFutureCycle from '@/database/utils/generateFutureCycle';

/* DATEBASE READS */
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

  const cyclePos = computeCyclePosition(oldRows, REPEAT_CYCLE);
  const futureRows = generateFutureCycle(
    cyclePos,
    REPEAT_CYCLE,
    unreadRows,
    [] as Array<ReadListHistory> // TODO source reread books from shortlist (TBI)
  );

  const last = oldRows.map(toViewModel);
  const next = futureRows.map(toViewModel).toReversed();

  return { last, next, cyclePos };
}
