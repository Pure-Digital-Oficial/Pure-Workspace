import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import {
  ListUsersByCompanyIdDto,
  ListUsersByCompanyIdResponseDto,
} from '../../../dto';
import { EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';
import { ListUsersByCompanyIdRepository } from '../../../repository/company/utils/list-users-by-company-id';

export class ListUsersByCompanyId
  implements
    UseCase<
      ListUsersByCompanyIdDto,
      Either<EntityNotEmpty, ListUsersByCompanyIdResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('ListUsersByCompanyIdRepository')
    private listUsersByCompanyIdRepository: ListUsersByCompanyIdRepository
  ) {}
  async execute(
    input: ListUsersByCompanyIdDto
  ): Promise<Either<EntityNotEmpty, ListUsersByCompanyIdResponseDto>> {
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

    const listUsers = await this.listUsersByCompanyIdRepository.list(input);

    return right(listUsers);
  }
}
