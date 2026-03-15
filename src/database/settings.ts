import db from './db';

import { toViewModel } from './mappers';

import { Settings, SettingsUpdateRequest } from '@/types/Settings';

const settingsQuery = `SELECT * FROM Settings WHERE Id = ?`;

// Reads
export function getSettings() {
  const item = db.prepare(settingsQuery).get(1) as Settings;
  return toViewModel(item);
}

export async function getSettingsAsync() {
  return getSettings();
}

// Writes
export async function updateSettings(update: SettingsUpdateRequest) {
  const sql = `
    UPDATE Settings
       SET ReadList_RepeatFrequency = :readList_RepeatFrequency
     WHERE Id = :id`;

  const result = db.prepare(sql).run({ ...update, id: 1 });
  return result.changes === 1;
}
