import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { DeleteCategoryDto } from '../../../dto';
import { EntityNotDeleted, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { DeleteCategoryRepository } from '../../../repository/blog/category/delete-category';
import { ValidationCategoryId, ValidationUserId } from '../../../utils';

export class DeleteCategory
  implements UseCase<DeleteCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryByIdRepository')
    private findCategoryByIdRepository: FindCategoryByIdRepository,
    @Inject('DeleteCategoryRepository')
    private deleteCategoryRepository: DeleteCategoryRepository
  ) {}

  async execute(
    input: DeleteCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { id, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const categoryValidation = await ValidationCategoryId(
      id,
      this.findCategoryByIdRepository
    );

    if (categoryValidation.isLeft()) {
      return left(categoryValidation.value);
    }

    const deletedCategory = await this.deleteCategoryRepository.delete(input);

    if (Object.keys(deletedCategory).length < 1) {
      return left(new EntityNotDeleted('Category'));
    }

    return right(deletedCategory);
  }
}
