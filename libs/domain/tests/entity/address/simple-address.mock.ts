import { faker } from '@faker-js/faker';
import { SimpleAddressResponseDto } from '../../../src';
import { CityMock } from './city.mock';
import { CountryMock } from './country';

export const SimpleAddressMock: SimpleAddressResponseDto = {
  city: CityMock.name,
  country: CountryMock.name,
  district: faker.string.alpha(3),
  state: faker.location.state(),
  street: faker.location.street(),
  zipcode: faker.location.zipCode(),
};
