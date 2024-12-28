import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindPlaylistCategoryByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationPlaylistCategoryId(
  id: string,
  findPlaylistCategoryByIdRepository: FindPlaylistCategoryByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Playlist ID'));
  }

  const filteredPlaylistCategory =
    await findPlaylistCategoryByIdRepository.find(id);

  if (
    Object.keys(filteredPlaylistCategory?.id ?? filteredPlaylistCategory)
      .length < 1
  ) {
    return left(new EntityNotExists('Playlist Category'));
  }

  return right(undefined);
}
