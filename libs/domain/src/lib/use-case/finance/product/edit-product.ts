import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditProductDto } from '../../../dto';
import {
  EntityNotaNumber,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditProductRepository,
  FindProductByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import {
  ValidationNumberInString,
  ValidationProductId,
  ValidationUserId,
} from '../../../utils';

export class EditProduct
  implements
    UseCase<
      EditProductDto,
      Either<
        EntityNotEmpty | EntityNotExists | EntityNotaNumber | EntityNotEdit,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindProductByIdRepository')
    private findProductByIdRepository: FindProductByIdRepository,
    @Inject('EditProductRepository')
    private editProductRepository: EditProductRepository
  ) {}
  async execute(
    input: EditProductDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityNotaNumber | EntityNotEdit,
      string
    >
  > {
    const {
      body: { description, maximumDiscount, name, standardPrice },
      id,
      loggedUserId,
    } = input;

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

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('description'));
    }

    if (Object.keys(maximumDiscount).length < 1) {
      return left(new EntityNotEmpty('Maximum Discount'));
    }

    if (Object.keys(standardPrice).length < 1) {
      return left(new EntityNotEmpty('Standard Price'));
    }

    const validateMaximumDiscount = ValidationNumberInString(maximumDiscount);

    if (!validateMaximumDiscount) {
      return left(new EntityNotaNumber(maximumDiscount));
    }

    const validateStandardPrice = ValidationNumberInString(standardPrice);

    if (!validateStandardPrice) {
      return left(new EntityNotaNumber(standardPrice));
    }

    const edtiedProduct = await this.editProductRepository.edit(input);

    if (Object.keys(edtiedProduct).length < 1) {
      return left(new EntityNotEdit('Product'));
    }

    return right(edtiedProduct);
  }
}
