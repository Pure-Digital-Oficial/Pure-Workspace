import { BodyUserDto } from './body-user.dto';

export interface EditUserDto {
  body: BodyUserDto;
  loggedUserId: string;
}
