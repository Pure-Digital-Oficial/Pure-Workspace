import { faker } from '@faker-js/faker';
import { PreRegistartionResponseDto } from '../../../../src';

export const PreRegistartionResponseMock: PreRegistartionResponseDto = {
  id: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  step: 'INITIAL',
};
