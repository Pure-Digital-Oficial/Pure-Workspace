import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ListProductDto, ListProductResponseDto } from '../../../dto';
import { EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';
import {
  FindUserByIdRepository,
  ListProductRepository,
} from '../../../repository';

export class ListProduct
  implements
    UseCase<ListProductDto, Either<EntityNotEmpty, ListProductResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListProductRepository')
    private listProductRepository: ListProductRepository
  ) {}
  async execute(
    input: ListProductDto
  ): Promise<Either<EntityNotEmpty, ListProductResponseDto>> {
    const { loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );
    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const listProducts = await this.listProductRepository.list(input);

    return right(listProducts);
  }
}
