import {
  EntityNotActive,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import { FindUserByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationUserId(
  id: string,
  findUserByIdRepository: FindUserByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists | EntityNotActive, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('User ID'));
  }

  const filteredUser = await findUserByIdRepository.find(id);

  if (Object.keys(filteredUser?.userId ?? filteredUser).length < 1) {
    return left(new EntityNotExists('User'));
  }

  return right(undefined);
}
