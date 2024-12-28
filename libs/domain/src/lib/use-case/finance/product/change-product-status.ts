import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ChangeProductStatusDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty } from '../../../error';
import {
  ChangeProductStatusRepository,
  FindProductByIdRepository,
  FindUserByIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import {
  ValidationProductId,
  ValidationUserId,
  ValidationUserPermisssions,
} from '../../../utils';

export class ChangeProductStatus
  implements
    UseCase<
      ChangeProductStatusDto,
      Either<EntityNotEmpty | EntityNotEdit, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindProductByIdRepository')
    private findProductByIdRepository: FindProductByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository,
    @Inject('ChangeProductStatusRepository')
    private changeProductStatusRepository: ChangeProductStatusRepository
  ) {}
  async execute(
    input: ChangeProductStatusDto
  ): Promise<Either<EntityNotEmpty | EntityNotEdit, string>> {
    const { id, loggedUserId, status } = input;

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
      this.verifyUserPermissionsByIdRepository
    );

    if (permissionValidation.isLeft()) {
      return left(permissionValidation.value);
    }

    const productValidation = await ValidationProductId(
      id,
      this.findProductByIdRepository
    );
    if (productValidation.isLeft()) {
      return left(productValidation.value);
    }

    if (Object.keys(status).length < 1) {
      return left(new EntityNotEmpty('Status'));
    }

    const changedProduct = await this.changeProductStatusRepository.change(
      input
    );

    if (Object.keys(changedProduct).length < 1) {
      return left(new EntityNotEdit('Status'));
    }

    return right(changedProduct);
  }
}
