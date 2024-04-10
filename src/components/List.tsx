import styles from './List.module.css';

export default function List(props: React.HTMLProps<HTMLUListElement>) {
  const classes = [styles.list, props.className].filter((x) => !!x).join(' ');

  return <ul {...props} className={classes} />;
}
