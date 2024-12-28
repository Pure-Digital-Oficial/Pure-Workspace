import { GeneralStatus } from '../../../type';

export interface BodyUserDto {
  id: string;
  name: string;
  birthDate?: Date;
  status: GeneralStatus;
  type: string;
}
