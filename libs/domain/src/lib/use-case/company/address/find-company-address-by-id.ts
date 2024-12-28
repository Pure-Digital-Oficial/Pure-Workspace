import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import {
  CompanyAddressResponseDto,
  FindCompanyAddressByIdDto,
} from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyAddressByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class FindCompanyAddressById
  implements
    UseCase<
      FindCompanyAddressByIdDto,
      Either<EntityNotEmpty, CompanyAddressResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyAddressByIdRepository')
    private findCompanyAddressByIdRepository: FindCompanyAddressByIdRepository
  ) {}
  async execute(
    input: FindCompanyAddressByIdDto
  ): Promise<Either<EntityNotEmpty, CompanyAddressResponseDto>> {
    const { companyAddressId, loggedUserId } = input;

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

    return right(filteredCompanyAddress);
  }
}
