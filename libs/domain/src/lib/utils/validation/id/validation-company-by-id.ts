import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { FindCompanyByIdRepository } from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export async function ValidationCompanyId(
  id: string,
  findCompanyByIdRepository: FindCompanyByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('Company ID'));
  }

  const filteredCompany = await findCompanyByIdRepository.find(id);

  if (Object.keys(filteredCompany?.simple?.id ?? filteredCompany).length < 1) {
    return left(new EntityNotExists('Company'));
  }

  return right(undefined);
}
