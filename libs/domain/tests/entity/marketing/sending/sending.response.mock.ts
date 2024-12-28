import { faker } from '@faker-js/faker';
import { SendingResponseDto } from '../../../../src';

export const SendingResponseMock: SendingResponseDto = {
  id: faker.string.uuid(),
};
