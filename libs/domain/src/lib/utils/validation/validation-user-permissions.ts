import {
  EntityNotActive,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotPermissions,
} from '../../error';
import { VerifyUserPermissionsByIdRepository } from '../../repository';
import { Either, left, right } from '../../shared/either';
import { userTypes } from '../../type';

export async function ValidationUserPermisssions(
  id: string,
  types: userTypes[],
  verifyUserPermissionByIdRepository: VerifyUserPermissionsByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('User ID'));
  }

  const filteredPermissions = await verifyUserPermissionByIdRepository.verify(
    id
  );

  let validation = false;
  for (const type of types) {
    if (filteredPermissions.type === type) {
      validation = true;
    }
  }

  if (!validation) {
    return left(new EntityNotPermissions(id));
  }

  if (filteredPermissions.status !== 'ACTIVE') {
    return left(new EntityNotActive('User'));
  }

  return right(undefined);
}
