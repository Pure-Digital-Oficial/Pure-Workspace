import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import {
  CompanyResponsibleResponseDto,
  FindCompanyResponsibleByIdDto,
} from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyResponsibleByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class FindCompanyResponsibleById
  implements
    UseCase<
      FindCompanyResponsibleByIdDto,
      Either<EntityNotEmpty | EntityNotExists, CompanyResponsibleResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyResponsibleByIdRepository')
    private findCompanyResponsibleByIdRepository: FindCompanyResponsibleByIdRepository
  ) {}
  async execute(
    input: FindCompanyResponsibleByIdDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists, CompanyResponsibleResponseDto>
  > {
    const { companyResponsibleId, loggedUserId } = input;

    if (Object.keys(companyResponsibleId).length < 1) {
      return left(new EntityNotEmpty('Company Responsible ID'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredCompanyResponsible =
      await this.findCompanyResponsibleByIdRepository.find(
        companyResponsibleId
      );

    if (
      Object.keys(filteredCompanyResponsible?.id ?? filteredCompanyResponsible)
        .length < 1
    ) {
      return left(new EntityNotExists('Company Responsible'));
    }

    return right(filteredCompanyResponsible);
  }
}
