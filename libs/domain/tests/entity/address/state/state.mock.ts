import { faker } from '@faker-js/faker';
import { StateResponseDto } from '../../../../src';
import { CityMock } from '../city.mock';

export const StateMock: StateResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  uf: faker.string.alpha(2),
  cities: [CityMock],
};
