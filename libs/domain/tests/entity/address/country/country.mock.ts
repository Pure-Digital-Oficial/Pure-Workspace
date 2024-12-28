import { faker } from '@faker-js/faker';
import { CountryResponseDto } from '../../../../src';
import { StateMock } from '../state';

export const CountryMock: CountryResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  uf: faker.string.alpha(2),
  states: [StateMock],
};
