import { faker } from '@faker-js/faker';
import { CompanyResponsibleResponseDto } from '../../../../src';

export const CompanyResponsibleMock: CompanyResponsibleResponseDto = {
  id: faker.string.uuid(),
  birthdate: faker.date.birthdate(),
  document: faker.string.alpha(3),
  createdAt: faker.date.recent().toString(),
  email: faker.internet.email(),
  name: faker.person.firstName(),
  phone: faker.phone.number(),
  updatedAt: faker.date.recent().toString(),
};
