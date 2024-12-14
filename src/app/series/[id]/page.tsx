import { Metadata } from 'next';
import Link from 'next/link';

import { getSeriesById } from '@/database/series';
import List from '@/components/List';
import UpdateSeries from '@/components/UpdateSeries';
import RemoveBooksSeries from '@/components/RemoveBooksSeries';
import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const series = await getSeriesById(params.id);

  return {
    title: getPageTitle(`${series.name} Series`)
  };
}

export default async function SeriesById(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const seriesId = params.id;
  const series = await getSeriesById(seriesId);

  return (
    <>
      <h1>{series.name}</h1>
      <UpdateSeries data={series} />
      <hr />
      <List>
        {series.books.map((b) => (
          <li key={b.id} className={styles.item}>
            <Link href={`/books/${b.id}`}>{b.title}</Link>
            <RemoveBooksSeries bookId={b.id} />
          </li>
        ))}
      </List>
    </>
  );
}
