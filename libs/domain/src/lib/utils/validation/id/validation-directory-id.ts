import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindDirectoryByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationDirectoryId(
  id: string,
  findDirectoryByIdRepository: FindDirectoryByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty(`Directory ID id: ${id}`));
  }

  const result = await findDirectoryByIdRepository.find(id);

  if (Object.keys(result?.id ?? result).length < 1) {
    return left(new EntityNotExists(`Directory ID: ${id}`));
  }

  return right(undefined);
}
