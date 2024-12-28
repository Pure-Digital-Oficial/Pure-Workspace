import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ChangeUserTypeDto } from '../../dto';
import { EntityNotComplete, EntityNotEmpty, EntityNotType } from '../../error';
import { Either, left, right } from '../../shared/either';
import { ValidationUserId, ValidationUserPermisssions } from '../../utils';
import {
  ChangeUserTypeRepository,
  FindUserByIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../repository';
import { userTypes } from '../../type';

export class ChangeUserType
  implements UseCase<ChangeUserTypeDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository,
    @Inject('ChangeUserTypeRepository')
    private changeUserTypeRepository: ChangeUserTypeRepository
  ) {}
  async execute(
    input: ChangeUserTypeDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { loggedUserId, type, userId } = input;

    if (Object.keys(type).length < 1) {
      return left(new EntityNotEmpty('type'));
    }

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

    const validTypes = ['ADMIN', 'DEFAULT', 'DEFAULT_ADMIN'];
    if (!validTypes.includes(type)) {
      return left(new EntityNotType(type, 'User'));
    }

    const allowedTypes: userTypes[] =
      type === 'ADMIN' ? ['ADMIN'] : ['ADMIN', 'DEFAULT_ADMIN'];
    const permissionValidation = await ValidationUserPermisssions(
      loggedUserId,
      allowedTypes,
      this.verifyUserPermissionsByIdRepository
    );
    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const changedUser = await this.changeUserTypeRepository.change(input);

    if (Object.keys(changedUser).length < 1) {
      return left(new EntityNotComplete('Change User'));
    }

    return right(changedUser);
  }
}
