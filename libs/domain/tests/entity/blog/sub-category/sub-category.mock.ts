import { faker } from '@faker-js/faker';
import { SubCategoryResponseDto } from '../../../../src';

export const SubCategoryMock: SubCategoryResponseDto = {
  id: faker.string.uuid(),
  categoryId: faker.string.uuid(),
  category: faker.string.alpha(3),
  name: faker.string.alpha(3),
  description: faker.string.alpha(3),
  createdBy: faker.string.uuid(),
  updatedBy: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
