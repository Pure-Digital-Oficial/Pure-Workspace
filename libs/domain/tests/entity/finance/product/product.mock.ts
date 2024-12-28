import { faker } from '@faker-js/faker';
import { ProductResponseDto } from '../../../../src';

export const ProductMock: ProductResponseDto = {
  id: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  createdBy: faker.string.alpha(),
  updatedAt: faker.date.anytime(),
  updatedBy: faker.string.alpha(),
  name: faker.string.nanoid(),
  description: faker.string.nanoid(),
  maximumDiscount: faker.number.int().toString(),
  standardPrice: faker.number.int().toString(),
  status: 'ACTIVE',
};
