'use client';
import React from 'react';

import { formatDateForDisplay } from '@/utils/date';
import getDifferenceBetweenDates from '@/utils/getDateDifference';
import concat from '@/utils/concat';

import styles from './DateBlock.module.css';

interface DateBlockProps {
  startDate: string;
  endDate: string | null;
}

export default function DateBlock({ startDate, endDate }: DateBlockProps) {
  const diff = getDifferenceBetweenDates(startDate, endDate);
  const daysLabel = `${diff.details} ${diff.text}`;

  return (
    <div className={concat('dates', styles.dates)}>
      <div>{formatDateForDisplay(startDate)}</div>
      <div title={daysLabel}>
        <span aria-hidden>&nbsp;–&nbsp;</span>
      </div>
      <div>{endDate ? formatDateForDisplay(endDate) : '?? ??? ????'}</div>
    </div>
  );
}
