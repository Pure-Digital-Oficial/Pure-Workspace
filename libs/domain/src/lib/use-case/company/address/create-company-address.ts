import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EntityNotCreated, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  CreateCompanyAddressRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { CreateCompanyAddressDto } from '../../../dto';
import {
  ValidationAddressByIds,
  ValidationCompanyId,
  ValidationUserId,
} from '../../../utils';
import {
  FindCityByIdRepository,
  FindCountryByIdRepository,
  FindStateByIdRepository,
} from '../../../repository/address';

export class CreateCompanyAddress
  implements UseCase<CreateCompanyAddressDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindCountryByIdRepository')
    private findCountryByIdRepository: FindCountryByIdRepository,
    @Inject('FindStateByIdRepository')
    private findStateByIdRepository: FindStateByIdRepository,
    @Inject('FindCityByIdRepository')
    private findCityByIdRepository: FindCityByIdRepository,
    @Inject('CreateCompanyAddressRepository')
    private createCompanyAddressRepository: CreateCompanyAddressRepository
  ) {}

  async execute(
    input: CreateCompanyAddressDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      body: { cityId, countryId, district, number, stateId, street, zipcode },
      companyId,
      loggedUserId,
    } = input;

    if (Object.keys(district).length < 1) {
      return left(new EntityNotEmpty('District'));
    }

    if (Object.keys(number).length < 1) {
      return left(new EntityNotEmpty('Number'));
    }

    if (Object.keys(street).length < 1) {
      return left(new EntityNotEmpty('Street'));
    }

    if (Object.keys(zipcode).length < 1) {
      return left(new EntityNotEmpty('Zipcode'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const addressValidation = await ValidationAddressByIds(
      {
        cityId,
        countryId,
        stateId,
      },
      {
        findCityById: this.findCityByIdRepository,
        findCountryById: this.findCountryByIdRepository,
        findStateById: this.findStateByIdRepository,
      }
    );

    if (addressValidation.isLeft()) {
      return left(addressValidation.value);
    }

    const createdCompanyAddress =
      await this.createCompanyAddressRepository.create(input);

    if (Object.keys(createdCompanyAddress).length < 1) {
      return left(new EntityNotCreated('Company Address'));
    }

    return right(createdCompanyAddress);
  }
}
