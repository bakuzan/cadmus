/* Date Manipulations */
export function getDateYear(date: string) {
  return new Date(date).getFullYear();
}

/* Date Formatting */
export function getTodayYYYYMMDD() {
  return new Date()
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .reverse()
    .join('-');
}

export function formatDateForDisplay(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}
