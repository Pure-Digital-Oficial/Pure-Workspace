import { GeneralStatus, userTypes } from '../../../type';

export interface SimpleUserPrismaDto {
  auth: {
    email: string;
  }[];
  user_id: string;
  name: string;
  nick_name: string;
  status: GeneralStatus;
  type: userTypes;
  birth_date: Date | null;
}
