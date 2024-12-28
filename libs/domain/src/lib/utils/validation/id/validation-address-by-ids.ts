import {
  AddressValidationDto,
  AdressRepositoriesValidationDto,
} from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';

export async function ValidationAddressByIds(
  input: AddressValidationDto,
  respositories: AdressRepositoriesValidationDto
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(input.countryId).length < 1) {
    return left(new EntityNotEmpty('Country ID'));
  }

  if (Object.keys(input.cityId).length < 1) {
    return left(new EntityNotEmpty('City ID'));
  }

  if (Object.keys(input.stateId).length < 1) {
    return left(new EntityNotEmpty('State ID'));
  }

  const filteredCountry = await respositories.findCountryById.find(
    input.countryId
  );

  if (Object.keys(filteredCountry?.id ?? filteredCountry).length < 1) {
    return left(new EntityNotExists('Country'));
  }

  const filteredState = await respositories.findStateById.find(input.stateId);

  if (Object.keys(filteredState?.id ?? filteredState).length < 1) {
    return left(new EntityNotExists('State'));
  }

  const filteredCity = await respositories.findCityById.find(input.cityId);

  if (Object.keys(filteredCity?.id ?? filteredCity).length < 1) {
    return left(new EntityNotExists('City'));
  }

  return right(undefined);
}
