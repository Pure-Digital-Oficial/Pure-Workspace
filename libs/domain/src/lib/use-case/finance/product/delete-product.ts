import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { DeleteProductDto } from '../../../dto';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  DeleteProductRepository,
  FindProductByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationProductId, ValidationUserId } from '../../../utils';

export class DeleteProduct
  implements
    UseCase<
      DeleteProductDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindProductByIdRepository')
    private findProductByIdRepository: FindProductByIdRepository,
    @Inject('DeleteProductRepository')
    private deleteProductRepository: DeleteProductRepository
  ) {}
  async execute(
    input: DeleteProductDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );
    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const productValidation = await ValidationProductId(
      id,
      this.findProductByIdRepository
    );
    if (productValidation.isLeft()) {
      return left(productValidation.value);
    }

    const deletedProduct = await this.deleteProductRepository.delete(input);

    if (Object.keys(deletedProduct).length < 1) {
      return left(new EntityNotDeleted('Product'));
    }

    return right(deletedProduct);
  }
}
