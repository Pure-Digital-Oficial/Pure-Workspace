import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateSubCategoryDto } from '../../../dto';
import { EntityNotCreated, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  CreateSubCategoryRepository,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCategoryId, ValidationUserId } from '../../../utils';

export class CreateSubCategory
  implements UseCase<CreateSubCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryBiIdRepository')
    private findCategoryByIdRepository: FindCategoryByIdRepository,
    @Inject('CreateSubCategoryRepository')
    private createSubCategoryRepository: CreateSubCategoryRepository
  ) {}
  async execute(
    input: CreateSubCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      loggedUserId,
      body: { name, description, categoryId },
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const categoryValidation = await ValidationCategoryId(
      categoryId,
      this.findCategoryByIdRepository
    );

    if (categoryValidation.isLeft()) {
      return left(categoryValidation.value);
    }

    const createdSubCategory = await this.createSubCategoryRepository.create(
      input
    );

    if (Object.keys(createdSubCategory).length < 1) {
      return left(new EntityNotCreated('SubCategory'));
    }

    return right(createdSubCategory);
  }
}
