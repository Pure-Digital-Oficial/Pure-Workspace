import { UserList } from '../../../../entity';

export interface ListUsersByCompanyIdResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  users: UserList[];
}
