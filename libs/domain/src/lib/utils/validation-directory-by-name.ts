import { EntityAlreadyExists, EntityNotEmpty } from '../error';
import { FindDirectoryByNameRepository } from '../repository';
import { Either, left, right } from '../shared/either';

export async function ValidationDirectoryByName(
  name: string,
  loggedUserId: string,
  findDirectoryByNameRepository: FindDirectoryByNameRepository
): Promise<Either<EntityNotEmpty | EntityAlreadyExists, void>> {
  if (Object.keys(name).length < 1) {
    return left(new EntityNotEmpty('Directory Name'));
  }

  const filteredDirectory = await findDirectoryByNameRepository.find({
    name,
    loggedUserId,
  });

  if (Object.keys(filteredDirectory?.id ?? filteredDirectory).length > 0) {
    return left(new EntityAlreadyExists('Directory'));
  }
  return right(undefined);
}
