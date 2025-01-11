import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ListCategoryDto, ListCategoryResponseDto } from '../../../dto';
import { EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindUserByIdRepository,
  ListCategoryRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class ListCategory
  implements
    UseCase<ListCategoryDto, Either<EntityNotEmpty, ListCategoryResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListCategoryRepository')
    private listCategoryRepository: ListCategoryRepository
  ) {}

  async execute(
    input: ListCategoryDto
  ): Promise<Either<EntityNotEmpty, ListCategoryResponseDto>> {
    const { loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const categoryList = await this.listCategoryRepository.list(input);

    return right(categoryList);
  }
}
