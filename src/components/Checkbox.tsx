'use client';

import concat from '@/utils/concat';

import styles from './Checkbox.module.css';

interface CheckboxProps {
  label: string;
  name: string;
  value: boolean;
  onChange: () => void;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <label className={concat(styles.checkbox, props.value && styles.checked)}>
      <span className={styles.icon} aria-hidden={true}>
        {props.value ? '☑' : '☐'}
      </span>
      <span className={styles.label}>{props.label}</span>
      <input type="checkbox" name={props.name} onChange={props.onChange} />
    </label>
  );
}
