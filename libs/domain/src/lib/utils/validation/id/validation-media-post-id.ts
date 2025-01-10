import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindMediaPostByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationMediaPostId(
  id: string,
  findMediaPostByIdRepository: FindMediaPostByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Post ID'));
  }

  const filteredMediaPost = await findMediaPostByIdRepository.find(id);

  if (Object.keys(filteredMediaPost?.id ?? filteredMediaPost).length < 1) {
    return left(new EntityNotExists('Media Post'));
  }

  return right(undefined);
}
