import ReadListList from '@/components/ReadListList';
import { getReadList } from '@/database/readlist';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

export const metadata = {
  title: getPageTitle('Read List')
};

export default async function ReadList() {
  const readlist = await getReadList();
  console.log(readlist);
  return (
    <>
      <h1>Read List</h1>
      <div className={styles.grid}>
        <div>
          <ReadListList items={readlist.next} />
          <hr />
          <ReadListList items={readlist.last} />
        </div>
        <div></div>
      </div>
    </>
  );
}
