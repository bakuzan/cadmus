'use client';

import { HistoryDetailedViewModel } from '@/types/History';
import { ImageDisplayMode } from '@/constants/imageDisplayMode';
import BookHistoryTable from './BookHistoryTable';

import styles from './StatsMonthCountsDetail.module.css';

interface StatsMonthCountsDetailProps {
  label: string;
  history: HistoryDetailedViewModel[];
}

export default function StatsMonthCountsDetail(
  props: StatsMonthCountsDetailProps
) {
  return (
    <section className={styles.detailSection}>
      <header>
        <h3>Read records for {props.label}</h3>
      </header>
      <div className={styles.container}>
        <BookHistoryTable
          history={props.history}
          includeYearRows={false}
          imageDisplayMode={ImageDisplayMode.ALL}
        />
      </div>
    </section>
  );
}
