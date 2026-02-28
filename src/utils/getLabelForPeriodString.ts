import monthNames from '@/constants/monthNames';

export default function getLabelForPeriodString(period: string) {
  if (!period) {
    return 'Unknown Period.';
  }

  // Year only handling
  if (!period.includes('-')) {
    return period;
  }

  //Month handling
  const [year, monthNumber] = period.split('-');
  const month = monthNames.get(monthNumber)?.long ?? 'Unknown';
  return `${month} ${year}`;
}
