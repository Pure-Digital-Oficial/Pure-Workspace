import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditCategoryDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditCategoryRepository,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCategoryId, ValidationUserId } from '../../../utils';

export class EditCategory
  implements UseCase<EditCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('EditCategoryRepository')
    private editCategoryRepository: EditCategoryRepository,
    @Inject('FindCategoryByIdRepository')
    private findCategoryByIdRepository: FindCategoryByIdRepository
  ) {}

  async execute(
    input: EditCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      id,
      loggedUserId,
      body: { name, description },
    } = input;

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

    if (Object.keys(input.body).length < 1) {
      return left(new EntityNotEmpty('Body'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    const editedCategory = await this.editCategoryRepository.edit(input);

    if (Object.keys(editedCategory).length < 1) {
      return left(new EntityNotEdit('Category'));
    }

    return right(editedCategory);
  }
}
