import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindPostByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationPostId(
  id: string,
  findPostByIdRepository: FindPostByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Post ID'));
  }

  const filteredPost = await findPostByIdRepository.find(id);

  if (Object.keys(filteredPost?.id ?? filteredPost).length < 1) {
    return left(new EntityNotExists('Post'));
  }

  return right(undefined);
}
