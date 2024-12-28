import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { UnauthorizeUserToCompanyDto } from '../../../dto';
import {
  EntityNotComplete,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  FindUserIdByCompanyIdRepository,
  UnauthorizeUserToCompanyRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../../repository';
import {
  ValidationCompanyId,
  ValidationUserIdByCompanyId,
  ValidationUserId,
  ValidationUserPermisssions,
} from '../../../utils';

export class UnauthorizeUserToCompany
  implements
    UseCase<
      UnauthorizeUserToCompanyDto,
      Either<EntityNotEmpty | EntityNotExists, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindUserIdByCompanyIdRepository')
    private findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository,
    @Inject('UnauthorizeUserToCompanyRepository')
    private unauthorizeUserToCompanyRepository: UnauthorizeUserToCompanyRepository
  ) {}

  async execute(
    input: UnauthorizeUserToCompanyDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, string>> {
    const { companyId, loggedUserId, userId } = input;

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

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const userAndcompanyValidation = await ValidationUserIdByCompanyId(
      userId,
      companyId,
      this.findUserIdByCompanyIdRepository
    );

    if (userAndcompanyValidation.isLeft()) {
      return left(userAndcompanyValidation.value);
    }

    const permissionValidation = await ValidationUserPermisssions(
      loggedUserId,
      ['ADMIN', 'DEFAULT_ADMIN'],
      this.verifyUserPermissionsByIdRepository
    );

    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const unauthorizedUser = await this.unauthorizeUserToCompanyRepository.auth(
      input
    );

    if (Object.keys(unauthorizedUser).length < 1) {
      return left(new EntityNotComplete('User'));
    }

    return right(unauthorizedUser);
  }
}
