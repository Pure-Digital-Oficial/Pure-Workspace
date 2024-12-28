import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreatePaymentModelDto } from '../../../dto';
import {
  EntityAlreadyExists,
  EntityIsNotEmpty,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../../error';
import {
  CreatePaymentModelRepository,
  FindPaymentModelByNameRepository,
  FindUserByIdRepository,
  VerifyUserPermissionsByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId, ValidationUserPermisssions } from '../../../utils';

export class CreatePaymentModel
  implements
    UseCase<
      CreatePaymentModelDto,
      Either<EntityIsNotEmpty | EntityAlreadyExists, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('VerifyUserPermissionsByIdRepository')
    private verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository,
    @Inject('FindPaymentModelByNameRepository')
    private findPaymentModelByNameReposiotory: FindPaymentModelByNameRepository,
    @Inject('CreatePaymentModelRepository')
    private createPaymentModelRepository: CreatePaymentModelRepository
  ) {}
  async execute(
    input: CreatePaymentModelDto
  ): Promise<Either<EntityIsNotEmpty | EntityAlreadyExists, string>> {
    const {
      body: { description, name },
      loggedUserId,
    } = input;

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

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    const filteredPaymentModel =
      await this.findPaymentModelByNameReposiotory.find({
        name: name,
      });

    if (
      Object.keys(filteredPaymentModel?.id ?? filteredPaymentModel).length > 0
    ) {
      return left(new EntityAlreadyExists('Payment Model'));
    }

    const createdPaymentModel = await this.createPaymentModelRepository.create(
      input
    );

    if (Object.keys(createdPaymentModel).length < 1) {
      return left(new EntityNotCreated('Payment Model'));
    }

    return right(createdPaymentModel);
  }
}
