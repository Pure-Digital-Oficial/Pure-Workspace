import { UserList } from '../../../entity';

export interface ListUserResponseDto {
  total: number;
  totalPages: number;
  users: UserList[];
}
