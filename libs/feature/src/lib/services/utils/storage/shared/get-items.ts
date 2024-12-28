export function getItemLocalStorage(key: string) {
  const json = localStorage.getItem(key);

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}
