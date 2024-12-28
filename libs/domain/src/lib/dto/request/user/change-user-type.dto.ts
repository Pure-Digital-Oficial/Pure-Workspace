import { userTypes } from '../../../type';

export interface ChangeUserTypeDto {
  loggedUserId: string;
  userId: string;
  type: userTypes;
}
