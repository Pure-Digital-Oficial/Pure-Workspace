import { removeItemLocalStorage } from '../storage';

export const appLogout = () => {
  const localKeys = ['u', 'lu', 'ui'];
  for (const item of localKeys) {
    removeItemLocalStorage(item);
  }
  window.location.reload();
};
