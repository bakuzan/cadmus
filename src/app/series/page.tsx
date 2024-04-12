import { getSeries } from '@/database/series';

import getPageTitle from '@/utils/getPageTitle';

import List from '@/components/List';
import AddSeries from '@/components/AddSeries';
import UpdateSeries from '@/components/UpdateSeries';

export const metadata = {
  title: getPageTitle('Series')
};

export default async function Series() {
  const series = await getSeries();

  return (
    <>
      <h1>Series</h1>
      <AddSeries />
      <hr />
      <List>
        {series.map((s) => (
          <li key={s.id}>
            <UpdateSeries data={s} />
          </li>
        ))}
      </List>
    </>
  );
}
