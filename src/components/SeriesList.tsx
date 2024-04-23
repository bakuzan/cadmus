'use client';
import { useState } from 'react';

import List from '@/components/List';
import SearchBox from '@/components/SearchBox';
import UpdateSeries from '@/components/UpdateSeries';

import { SeriesViewModel } from '@/types/Series';

function filterSeries(searchString: string) {
  const terms = searchString.toLowerCase().trim().split(' ');

  return function (value: SeriesViewModel) {
    return terms.every((t) => value.name.toLowerCase().includes(t));
  };
}

export default function SeriesList({ data }: { data: SeriesViewModel[] }) {
  const [searchString, setSearchString] = useState('');
  const series = data.filter(filterSeries(searchString));

  return (
    <>
      <SearchBox value={searchString} onChange={(v) => setSearchString(v)} />
      <List>
        {series.map((s) => (
          <li key={s.id}>
            <UpdateSeries data={s} showLink />
          </li>
        ))}
      </List>
    </>
  );
}
