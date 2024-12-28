import {
  FindCityByIdRepository,
  FindCountryByIdRepository,
  FindStateByIdRepository,
} from '../../../repository/address';

export interface AdressRepositoriesValidationDto {
  findCountryById: FindCountryByIdRepository;
  findStateById: FindStateByIdRepository;
  findCityById: FindCityByIdRepository;
}
