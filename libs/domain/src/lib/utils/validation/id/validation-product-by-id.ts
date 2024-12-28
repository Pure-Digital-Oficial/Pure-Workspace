import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindProductByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationProductId(
  id: string,
  findProductByIdRepository: FindProductByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Product ID'));
  }

  const filteredProduct = await findProductByIdRepository.find(id);

  if (Object.keys(filteredProduct?.id ?? filteredProduct).length < 1) {
    return left(new EntityNotExists('Product'));
  }

  return right(undefined);
}
