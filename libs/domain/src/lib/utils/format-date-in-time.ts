export function FormatDateInTime(date: Date) {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes === 0 ? '00' : minutes
  }`;
}
