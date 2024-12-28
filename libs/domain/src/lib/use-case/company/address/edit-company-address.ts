import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditCompanyAddressDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty, EntityNotExists } from '../../../error';
import {
  EditCompanyAddressRepository,
  FindCityByIdRepository,
  FindCompanyAddressByIdRepository,
  FindCountryByIdRepository,
  FindStateByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationAddressByIds, ValidationUserId } from '../../../utils';

export class EditCompanyAddress
  implements
    UseCase<
      EditCompanyAddressDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotEdit, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyAddressByIdRepository')
    private findCompanyAddressByIdRepository: FindCompanyAddressByIdRepository,
    @Inject('FindCountryByIdRepository')
    private findCountryByIdRepository: FindCountryByIdRepository,
    @Inject('FindStateByIdRepository')
    private findStateByIdRepository: FindStateByIdRepository,
    @Inject('FindCityByIdRepository')
    private findCityByIdRepository: FindCityByIdRepository,
    @Inject('EditCompanyAddressRepository')
    private editCompanyAddressRepository: EditCompanyAddressRepository
  ) {}
  async execute(
    input: EditCompanyAddressDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists | EntityNotEdit, string>> {
    const {
      body: { cityId, countryId, district, number, stateId, street, zipcode },
      companyAddressId,
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

    const filteredCompanyAddress =
      await this.findCompanyAddressByIdRepository.find(companyAddressId);

    if (
      Object.keys(filteredCompanyAddress?.id ?? filteredCompanyAddress).length <
      1
    ) {
      return left(new EntityNotExists('Company Address'));
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

    const editedCompanyAddress = await this.editCompanyAddressRepository.edit(
      input
    );

    if (Object.keys(editedCompanyAddress).length < 1) {
      return left(new EntityNotEdit('Company Address'));
    }

    return right(editedCompanyAddress);
  }
}
