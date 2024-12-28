import { PermissionsUserResponseDto } from '../../dto';

export interface VerifyUserPermissionsByIdRepository {
  verify(id: string): Promise<PermissionsUserResponseDto>;
}
