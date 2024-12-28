import { GeneralStatus, userTypes } from '../../../type';

export interface UserPrismaDto {
  user_id: string;
  user: {
    status: GeneralStatus;
    name: string;
    nick_name: string;
    type: userTypes;
    birth_date: Date | null;
    auth: {
      email: string;
    }[];
  };
}
