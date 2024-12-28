import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindDeviceByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationDeviceId(
  id: string,
  findDeviceByIdRepository: FindDeviceByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Device ID'));
  }

  const filteredPlaylist = await findDeviceByIdRepository.find(id);

  if (Object.keys(filteredPlaylist?.id ?? filteredPlaylist).length < 1) {
    return left(new EntityNotExists('Device'));
  }

  return right(undefined);
}
