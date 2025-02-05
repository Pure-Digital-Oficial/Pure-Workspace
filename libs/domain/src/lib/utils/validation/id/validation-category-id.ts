import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindCategoryByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationCategoryId(
  id: string,
  findCategoryByIdRepository: FindCategoryByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Category ID'));
  }

  const filteredCategory = await findCategoryByIdRepository.find(id);

  if (Object.keys(filteredCategory?.id ?? filteredCategory).length < 1) {
    return left(new EntityNotExists('Category'));
  }

  return right(undefined);
}
