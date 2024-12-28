import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CompanyDataResponseDto, FindCompanyDataByIdDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyDataByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class FindCompanyDataById
  implements
    UseCase<
      FindCompanyDataByIdDto,
      Either<EntityNotEmpty, CompanyDataResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyDataByIdRepository')
    private findCompanyDataByIdRepository: FindCompanyDataByIdRepository
  ) {}
  async execute(
    input: FindCompanyDataByIdDto
  ): Promise<Either<EntityNotEmpty, CompanyDataResponseDto>> {
    const { companyDataId, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredCompanyData = await this.findCompanyDataByIdRepository.find(
      companyDataId
    );

    if (
      Object.keys(filteredCompanyData?.id ?? filteredCompanyData).length < 1
    ) {
      return left(new EntityNotExists('Company'));
    }

    return right(filteredCompanyData);
  }
}
