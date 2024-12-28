import { ListCompanyResponseDto } from '../../../../src';
import { ListSimpleCompanyMock } from './list-simple-company.mock';

export const ListCompanyMock: ListCompanyResponseDto = {
  companies: [ListSimpleCompanyMock, ListSimpleCompanyMock],
  filteredTotal: 1,
  total: 1,
  totalPages: 1,
};
