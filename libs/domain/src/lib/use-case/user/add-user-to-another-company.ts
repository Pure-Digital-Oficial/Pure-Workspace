import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { AddUserToAnotherCompanyDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityIsNotEmpty,
  EntityNotAssociate,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  AddUserToAnotherCompanyRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  FindUserIdByCompanyIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../repository';
import {
  ValidationCompanyId,
  ValidationUserId,
  ValidationUserIdByCompanyId,
  ValidationUserPermisssions,
} from '../../utils';

export class AddUserToAnotherCompany
  implements
    UseCase<AddUserToAnotherCompanyDto, Either<EntityIsNotEmpty, string>>
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
    @Inject('AddUserToAnotherCompanyRepository')
    private addUserToAnotherCompanyRepository: AddUserToAnotherCompanyRepository
  ) {}
  async execute(
    input: AddUserToAnotherCompanyDto
  ): Promise<Either<EntityIsNotEmpty, string>> {
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

    const userInCompanyValidation = await ValidationUserIdByCompanyId(
      loggedUserId,
      companyId,
      this.findUserIdByCompanyIdRepository
    );

    if (userInCompanyValidation.isLeft()) {
      return left(userInCompanyValidation.value);
    }

    const userAndCompanyFiltered =
      await this.findUserIdByCompanyIdRepository.find({
        companyId,
        userId: userId,
      });

    if (Object.keys(userAndCompanyFiltered).length > 0) {
      return left(new EntityAlreadyExists('User in Company'));
    }

    const permissionValidation = await ValidationUserPermisssions(
      loggedUserId,
      ['ADMIN', 'DEFAULT_ADMIN'],
      this.verifyUserPermissionsByIdRepository
    );

    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const addedUserInCompany = await this.addUserToAnotherCompanyRepository.add(
      input
    );

    if (Object.keys(addedUserInCompany).length < 1) {
      return left(new EntityNotAssociate('User', 'Company'));
    }

    return right(addedUserInCompany);
  }
}
