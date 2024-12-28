import { ILoggedUser } from '@pure-workspace/domain';

export function setUserLocalStorage(user: ILoggedUser | null) {
  localStorage.setItem('u', JSON.stringify(user));
}
