import { faker } from '@faker-js/faker';
import { ListSimpleCountryResponseDto } from '../../../../src';

export const listSimpleCountryMock: ListSimpleCountryResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  uf: faker.string.alpha(2),
};
