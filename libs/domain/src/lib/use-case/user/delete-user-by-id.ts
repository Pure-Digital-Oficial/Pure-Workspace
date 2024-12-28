import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeleteUserByIdDto } from '../../dto';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotPermissions,
} from '../../error';
import {
  DeleteUserByIdRepository,
  FindUserByIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationUserId, ValidationUserPermisssions } from '../../utils';

export class DeleteUserById
  implements
    UseCase<
      DeleteUserByIdDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotPermissions, string>
    >
{
  constructor(
    @Inject('DeleteUserByIdRepository')
    private deleteUserByIdRepository: DeleteUserByIdRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository
  ) {}
  async execute(
    input: DeleteUserByIdDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotPermissions, string>
  > {
    const { id, loggedUser, description } = input;
    const loggedUserString = 'Usuário';

    if (Object.keys(loggedUser).length < 1) {
      return left(new EntityNotEmpty(loggedUserString));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('descrição'));
    }

    const findedLoggedUser = await this.findUserByIdRepository.find(loggedUser);

    if (Object.keys(findedLoggedUser).length < 1) {
      return left(new EntityNotExists(loggedUserString));
    }

    const permissionValidation = await ValidationUserPermisssions(
      loggedUser,
      ['ADMIN', 'DEFAULT_ADMIN'],
      this.verifyUserPermissionsByIdRepository
    );

    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const userValidation = await ValidationUserId(
      id,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const deletedUser = await this.deleteUserByIdRepository.delete(input);

    if (Object.keys(deletedUser).length < 1) {
      return left(new EntityNotDeleted('Usuário'));
    }

    return right(deletedUser);
  }
}
