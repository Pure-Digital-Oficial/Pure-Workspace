import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { Either, left, right } from '../../shared/either';
import {
  BtrinSanitizeRepository,
  FindUserByIdRepository,
  ListUserRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../repository';
import { ListUserDto, ListUserResponseDto } from '../../dto';
import { SyntaxError } from '../../error';
import { ValidationUserId, ValidationUserPermisssions } from '../../utils';

export class ListUser
  implements UseCase<ListUserDto, Either<SyntaxError, ListUserResponseDto>>
{
  constructor(
    @Inject('ListUserRepository')
    private listUserRepository: ListUserRepository,
    @Inject('BtrinSanatizeRepository')
    private btrinSanitizeRepository: BtrinSanitizeRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionByIdRepository: VerifyUserPermissionsByIdRepository
  ) {}

  async execute(
    input: ListUserDto
  ): Promise<Either<SyntaxError, ListUserResponseDto>> {
    const { filter, loggedUserId } = input;
    const sanitizedInput = await this.btrinSanitizeRepository.btrin(filter);
    if (sanitizedInput === undefined) {
      return left(new SyntaxError());
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const permissionValidation = await ValidationUserPermisssions(
      loggedUserId,
      ['ADMIN'],
      this.verifyUserPermissionByIdRepository
    );

    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const listUserResult = await this.listUserRepository.list(input);

    return right(listUserResult);
  }
}
