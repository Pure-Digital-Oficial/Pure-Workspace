import { faker } from '@faker-js/faker';
import { CategoryResponseDto } from '../../../../src';

export const CategoryMock: CategoryResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  description: faker.string.alpha(3),
  url_image: faker.string.alpha(4),
  image_name: faker.string.alpha(4),
  createdBy: faker.string.uuid(),
  updatedBy: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
