export function removeSpecialCharacters(str: string): string {
  return str.replace(/[^\w\s.]/gi, '');
}
