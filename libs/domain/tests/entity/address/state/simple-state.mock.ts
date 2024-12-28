import { faker } from '@faker-js/faker';
import { ListSimpleStateResponseDto } from '../../../../src';

export const ListSimpleStateMock: ListSimpleStateResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  uf: faker.string.alpha(2),
};
