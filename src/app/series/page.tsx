import { getSeries } from '@/database/series';

import getPageTitle from '@/utils/getPageTitle';

import AddSeries from '@/components/AddSeries';
import SeriesList from '@/components/SeriesList';

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
      <SeriesList data={series} />
    </>
  );
}
