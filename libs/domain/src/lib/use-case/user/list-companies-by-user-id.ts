import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ListCompaniesByUserIdDto, ListCompanyResponseDto } from '../../dto';
import { EntityIsNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindUserByIdRepository,
  ListCompaniesByUserIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../repository';
import { ValidationUserId, ValidationUserPermisssions } from '../../utils';

export class ListCompaniesByUserId
  implements
    UseCase<
      ListCompaniesByUserIdDto,
      Either<EntityIsNotEmpty, ListCompanyResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository,
    @Inject('ListCompaniesByUserIdRepository')
    private listCompaniesByUserIdRepository: ListCompaniesByUserIdRepository
  ) {}
  async execute(
    input: ListCompaniesByUserIdDto
  ): Promise<Either<EntityIsNotEmpty, ListCompanyResponseDto>> {
    const { loggedUserId, userId } = input;

    const loggedUserValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (loggedUserValidation.isLeft()) {
      return left(loggedUserValidation.value);
    }

    const userValidation = await ValidationUserId(
      userId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const permissionValidation = await ValidationUserPermisssions(
      loggedUserId,
      ['ADMIN', 'DEFAULT_ADMIN'],
      this.verifyUserPermissionsByIdRepository
    );

    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const listCompaniesByUser = await this.listCompaniesByUserIdRepository.list(
      input
    );

    return right(listCompaniesByUser);
  }
}
