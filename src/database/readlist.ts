import db from './db';
import getStoredProceedure from './storedProceedures';

import { toViewModel } from './mappers';

import { ReadListHistory } from '@/types/ReadList';

// TODO : Move to db in a settings table configurable from UI
const REPEAT_CYCLE = 4; // 4th book must be re-read

/* DATEBASE READS */
export async function getReadList() {
  const query = getStoredProceedure('readlist_GetHistory');
  const rows = db
    .prepare(query)
    .all({ limit: REPEAT_CYCLE }) as ReadListHistory[];

  const last = rows.map(toViewModel);
  const next: Array<any> = [];

  return { last, next };
}
