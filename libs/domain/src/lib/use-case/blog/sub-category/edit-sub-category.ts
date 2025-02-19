import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditSubCategoryDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditSubCategoryRepository,
  FindCategoryByIdRepository,
  FindSubCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import {
  ValidationCategoryId,
  ValidationSubCategoryId,
  ValidationUserId,
} from '../../../utils';

export class EditSubCategory
  implements UseCase<EditSubCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('EditSubCategoryRepository')
    private editSubCategoryRepository: EditSubCategoryRepository,
    @Inject('FindSubCategoryByIdRepository')
    private findSubCategoryByIdRepository: FindSubCategoryByIdRepository,
    @Inject('FindCategoryByIdRepository')
    private findCategoryByIdRepository: FindCategoryByIdRepository
  ) {}

  async execute(
    input: EditSubCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      id,
      loggedUserId,
      body: { name, description, categoryId },
    } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    if (Object.keys(input.body).length < 1) {
      return left(new EntityNotEmpty('Body'));
    }

    const subCategoryValidation = await ValidationSubCategoryId(
      id,
      this.findSubCategoryByIdRepository
    );

    if (subCategoryValidation.isLeft()) {
      return left(subCategoryValidation.value);
    }

    const categoryValidation = await ValidationCategoryId(
      categoryId,
      this.findCategoryByIdRepository
    );

    if (categoryValidation.isLeft()) {
      return left(categoryValidation.value);
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    const editedCategory = await this.editSubCategoryRepository.edit(input);

    if (Object.keys(editedCategory).length < 1) {
      return left(new EntityNotEdit('SubCategory'));
    }

    return right(editedCategory);
  }
}
