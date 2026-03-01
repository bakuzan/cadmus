import monthNames from '@/constants/monthNames';

export default function getLabelForPeriodString(
  period: string,
  bookCount: number
) {
  if (!period) {
    return 'Unknown Period.';
  }

  let label: string;

  if (!period.includes('-')) {
    label = period;
  } else {
    const [year, monthNumber] = period.split('-');
    const month = monthNames.get(monthNumber)?.long ?? 'Unknown';
    label = `${month} ${year}`;
  }

  return `${bookCount} books in ${label}`;
}
