import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { EditUserDto } from '../../dto';
import {
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '../../error';
import {
  EditUserRepository,
  FindUserByIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationUserId, ValidationUserPermisssions } from '../../utils';

export class EditUser
  implements
    UseCase<
      EditUserDto,
      Either<InsufficientCharacters | EntityNotExists, string>
    >
{
  constructor(
    @Inject('EditUserRepository')
    private editUserRepository: EditUserRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository
  ) {}

  async execute(
    input: EditUserDto
  ): Promise<Either<InsufficientCharacters | EntityNotExists, string>> {
    const {
      body: { id, name, status },
      loggedUserId,
    } = input;

    if (Object.keys(name).length < 3) {
      return left(new InsufficientCharacters('name'));
    }

    if (Object.keys(status).length < 1) {
      return left(new EntityNotEmpty('status'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('Logged User ID'));
    }

    const userValidation = await ValidationUserId(
      id,
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

    const editedUserId = await this.editUserRepository.edit(input);

    if (Object.keys(editedUserId).length < 1) {
      return left(new EntityNotEdit('user'));
    }

    return right(editedUserId);
  }
}
