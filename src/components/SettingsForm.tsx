'use client';

import { SettingsViewModel } from '@/types/Settings';

import onUpdateSettings from '@/actions/onUpdateSettings';
import useToast from '@/hooks/useToast';
import concat from '@/utils/concat';

import styles from './SettingsForm.module.css';

interface SettingsFormProps {
  data: SettingsViewModel;
}

export default function SettingsForm(props: SettingsFormProps) {
  const toast = useToast();

  return (
    <form
      className={concat(styles.form, styles.formShrink)}
      id="updateSettings"
      name="updateSettings"
      action={(data) =>
        onUpdateSettings(data)
          .then(({ message }) => toast('info', message))
          .catch((error) => toast('error', error.message))
      }
    >
      <div>
        <label className={styles.label}>
          Read List Repeat Frequency
          <input
            className={styles.input}
            type="number"
            name="readList_RepeatFrequency"
            placeholder="Enter a positive number"
            required
            defaultValue={props.data.readList_RepeatFrequency}
          />
        </label>
        <hr />
      </div>

      <div className={styles.actions}>
        <button type="submit" className="primary">
          Save
        </button>
      </div>
    </form>
  );
}
