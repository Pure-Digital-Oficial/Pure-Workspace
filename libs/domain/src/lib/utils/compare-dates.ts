export function compareDates(dateFrom: Date, dateCompare: Date): boolean {
  return (
    dateFrom.getFullYear() === dateCompare.getFullYear() &&
    dateFrom.getMonth() === dateCompare.getMonth() &&
    dateFrom.getDate() === dateCompare.getDate()
  );
}
