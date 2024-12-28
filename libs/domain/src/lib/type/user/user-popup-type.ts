import { CrudType } from '../crud-type';

export type UserPopupType =
  | CrudType
  | 'add-company'
  | 'list-company'
  | 'change-type';
