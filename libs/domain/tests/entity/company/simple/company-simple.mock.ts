import { faker } from '@faker-js/faker';
import { Company } from '../../../../src';

export const CompanySimpleMock: Company = {
  id: faker.string.uuid(),
  cnpj: '27199213000140',
  fantasyName: faker.company.name(),
  socialReason: faker.company.name(),
  createdBy: faker.string.uuid(),
  cretedAt: faker.date.recent(),
};
