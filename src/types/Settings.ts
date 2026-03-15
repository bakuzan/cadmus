import { UncapitalizeObjectKeys } from './utils';

// Database models
export interface Settings {
  Id: number;
  ReadList_RepeatFrequency: number;
}

// View Models
export type SettingsViewModel = UncapitalizeObjectKeys<Settings>;

export type SettingsUpdateRequest = Omit<SettingsViewModel, 'id'>;
