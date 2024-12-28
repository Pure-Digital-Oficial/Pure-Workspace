import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindSchedulingByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationSchedulingId(
  id: string,
  findSchedulingByIdRepository: FindSchedulingByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Scheduling ID'));
  }

  const result = await findSchedulingByIdRepository.find(id);

  if (Object.keys(result?.id ?? result).length < 1) {
    return left(new EntityNotExists('Scheduling'));
  }

  return right(undefined);
}
