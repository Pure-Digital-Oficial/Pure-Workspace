import {
  PermissionsUserResponseDto,
  VerifyUserPermissionsByIdRepository,
} from '../../../src';
import { PermissionsUserResponseMock } from '../../entity';

export class VerifyUserPermissionsByIdRepositoryMock
  implements VerifyUserPermissionsByIdRepository
{
  inputMock = '';
  async verify(input: string): Promise<PermissionsUserResponseDto> {
    this.inputMock = input;
    return PermissionsUserResponseMock;
  }
}
