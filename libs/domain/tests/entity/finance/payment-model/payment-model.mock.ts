import { faker } from '@faker-js/faker';
import { PaymentModelResponseDto } from '../../../../src';

export const PaymentModelMock: PaymentModelResponseDto = {
  id: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  createdBy: faker.internet.userName(),
  description: faker.internet.displayName(),
  name: faker.internet.userName(),
  status: faker.string.alpha(3),
  updatedAt: faker.date.anytime(),
};
