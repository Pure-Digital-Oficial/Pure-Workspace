import { Inject } from '@nestjs/common';

import { CreateProductDto } from '../../../dto';
import {
  EntityAlreadyExists,
  EntityIsNotEmpty,
  EntityNotaNumber,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  CreateProductRepository,
  FindProductByNameRespository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationNumberInString, ValidationUserId } from '../../../utils';
import { UseCase } from '../../../base/use-case';

export class CreateProduct
  implements
    UseCase<
      CreateProductDto,
      Either<
        | EntityIsNotEmpty
        | EntityNotExists
        | EntityAlreadyExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindProductByNameRespository')
    private findProductByNameRespository: FindProductByNameRespository,
    @Inject('CreateProductRepository')
    private createProductRespository: CreateProductRepository
  ) {}
  async execute(
    input: CreateProductDto
  ): Promise<
    Either<
      | EntityIsNotEmpty
      | EntityNotExists
      | EntityAlreadyExists
      | EntityNotCreated,
      string
    >
  > {
    const {
      body: { name, description, maximumDiscount, standardPrice },
      loggedUserId,
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
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

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredProduct = await this.findProductByNameRespository.find({
      name,
    });

    if (Object.keys(filteredProduct?.id ?? filteredProduct).length > 1) {
      return left(new EntityAlreadyExists('Product'));
    }

    const createadProduct = await this.createProductRespository.create(input);

    if (Object.keys(createadProduct).length < 1) {
      return left(new EntityNotCreated('Product'));
    }

    return right(createadProduct);
  }
}
