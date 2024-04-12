import styles from './InLibraryIcon.module.css';

export default function InLibraryIcon({ isIn }: { isIn: boolean }) {
  return (
    <div
      className={styles.icon}
      aria-label={isIn ? 'In library' : 'Not in library'}
      title={isIn ? 'In library' : 'Not in library'}
    >
      <span aria-hidden={true}>{isIn ? '☑' : '☐'}</span>
    </div>
  );
}
