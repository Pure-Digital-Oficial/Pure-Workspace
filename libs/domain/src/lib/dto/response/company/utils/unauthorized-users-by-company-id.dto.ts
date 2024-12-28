import { UserList } from '../../../../entity';

export interface UnauthorizedUsersByCompanyIdResponseDto {
  listUsers: UserList[];
  total: number;
}
