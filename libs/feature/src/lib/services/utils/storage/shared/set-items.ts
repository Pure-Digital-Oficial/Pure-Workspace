export function setItemLocalStorage(item: string | undefined, key: string) {
  localStorage.setItem(key, JSON.stringify(item));
}
