import concat from '@/utils/concat';
import styles from './List.module.css';

export default function List(props: React.HTMLProps<HTMLUListElement>) {
  return <ul {...props} className={concat(styles.list, props.className)} />;
}
