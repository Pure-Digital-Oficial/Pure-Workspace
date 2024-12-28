import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindUserIdByCompanyIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationUserIdByCompanyId(
  userId: string,
  companyId: string,
  findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(userId).length < 1) {
    return left(new EntityNotEmpty('User ID'));
  }

  if (Object.keys(companyId).length < 1) {
    return left(new EntityNotEmpty('Company ID'));
  }

  const result = await findUserIdByCompanyIdRepository.find({
    companyId,
    userId,
  });

  if (Object.keys(result).length < 1) {
    return left(new EntityNotExists('User or Company'));
  }

  return right(undefined);
}
