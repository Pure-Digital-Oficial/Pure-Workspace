import { faker } from '@faker-js/faker';
import { ContactUsResponseDto } from '../../../../src';

export const ContactUsMock: ContactUsResponseDto = {
  id: faker.string.uuid(),
  description: faker.vehicle.vehicle(),
  email: faker.internet.email(),
  name: faker.animal.cat(),
  number: faker.phone.number(),
};
