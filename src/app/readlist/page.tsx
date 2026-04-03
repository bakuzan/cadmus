import { getReadList } from '@/database/readlist';

import onReorderRepeatShortlist from '@/actions/onReorderRepeatShortlist';
import onReorderUnreadShortlist from '@/actions/onReorderUnreadShortlist';
import ReadListList from '@/components/ReadListList';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Read List')
};

export default async function ReadList() {
  const readlist = await getReadList();
  console.log(readlist);
  return (
    <>
      <div className={styles.grid}>
        <section className={styles.left}>
          <header>
            <h2>Read Queue</h2>
          </header>
          <ReadListList items={readlist.next} />
          <hr />
          <ReadListList items={readlist.last} />
        </section>

        <div className={styles.right}>
          <section className={styles.top}>
            <header>
              <h2>Unread Books</h2>
            </header>
            <ReadListList
              items={readlist.unread}
              listLimit={readlist.rereadEveryNthBook}
              reorderableAction={onReorderUnreadShortlist}
            />
            <hr />
          </section>
          <section className={styles.bottom}>
            <header>
              <h2>Repeat Shortlist</h2>
            </header>
            <ReadListList
              items={readlist.shortlist}
              includeShortlistButton
              reorderableAction={onReorderRepeatShortlist}
            />
          </section>
        </div>
      </div>
    </>
  );
}
