import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindSubCategoryByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationSubCategoryId(
  id: string,
  findSubCategoryByIdRepository: FindSubCategoryByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('SubCategory ID'));
  }

  const filteredSubCategory = await findSubCategoryByIdRepository.find(id);

  if (Object.keys(filteredSubCategory?.id ?? filteredSubCategory).length < 1) {
    return left(new EntityNotExists('SubCategory'));
  }

  return right(undefined);
}
