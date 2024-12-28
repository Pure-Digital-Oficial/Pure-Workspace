import { ListSimpleCompanyResponseDto } from '../../../../src';
import { faker } from '@faker-js/faker';

export const ListSimpleCompanyMock: ListSimpleCompanyResponseDto = {
  id: faker.string.uuid(),
  cnpj: '27199213000140',
  fantasyName: faker.company.name(),
  socialReason: faker.company.name(),
  createdBy: faker.string.uuid(),
  createdAt: faker.date.recent(),
  city: faker.location.city(),
  status: 'ACTIVE',
};
