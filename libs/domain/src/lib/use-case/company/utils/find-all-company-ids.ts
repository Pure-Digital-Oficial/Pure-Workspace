import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CompanyAllIdsResponseDto, FindAllCompanyIdsDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindAllCompanyIdsRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class FindAllCompanyIds
  implements
    UseCase<
      FindAllCompanyIdsDto,
      Either<EntityNotEmpty, CompanyAllIdsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindAllCompanyIdsRepository')
    private findAllCompanyIdsRepository: FindAllCompanyIdsRepository
  ) {}

  async execute(
    input: FindAllCompanyIdsDto
  ): Promise<Either<EntityNotEmpty, CompanyAllIdsResponseDto>> {
    const { companyId, loggedUserId } = input;

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

    const filteredAllCompanyIds = await this.findAllCompanyIdsRepository.find(
      input
    );

    if (
      Object.keys(
        filteredAllCompanyIds?.companySimpleId ?? filteredAllCompanyIds
      ).length < 1
    ) {
      return left(new EntityNotExists('All IDs'));
    }

    return right(filteredAllCompanyIds);
  }
}
