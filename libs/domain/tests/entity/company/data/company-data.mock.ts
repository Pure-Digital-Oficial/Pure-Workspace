import { faker } from '@faker-js/faker';
import { CompanyDataResponseDto } from '../../../../src';

export const CompanyDataMock: CompanyDataResponseDto = {
  id: faker.string.uuid(),
  legalNature: faker.lorem.word(),
  opening: faker.date.recent().toString(),
  phone: faker.phone.number(),
  port: faker.lorem.word(),
  situation: faker.lorem.word(),
  responsibleEmail: faker.internet.email(),
};
