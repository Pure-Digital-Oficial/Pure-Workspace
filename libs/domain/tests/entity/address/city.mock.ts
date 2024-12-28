import { faker } from '@faker-js/faker';
import { CityResponseDto } from '../../../src';

export const CityMock: CityResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
};
