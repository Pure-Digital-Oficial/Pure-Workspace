export function getUserLocalStorage() {
  const json = localStorage.getItem('u');

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}
