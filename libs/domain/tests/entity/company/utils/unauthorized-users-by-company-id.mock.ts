import { faker } from '@faker-js/faker';
import { UnauthorizedUsersByCompanyIdResponseDto } from '../../../../src';
import { listUserMock } from '../../../entity';

export const UnauthorizedUsersByCompanyIdMock: UnauthorizedUsersByCompanyIdResponseDto =
  {
    listUsers: listUserMock,
    total: faker.number.int(),
  };
