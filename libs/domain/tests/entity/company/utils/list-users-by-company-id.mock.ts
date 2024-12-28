import { ListUsersByCompanyIdResponseDto } from '../../../../src';
import { listUserMock } from '../../../entity';

export const ListUsersByCompanyMock: ListUsersByCompanyIdResponseDto = {
  filteredTotal: 1,
  total: 1,
  totalPages: 1,
  users: listUserMock,
};
