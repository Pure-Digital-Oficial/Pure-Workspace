import {
  FindUnauthorizedUsersByCompanyIdDto,
  FindUnauthorizedUsersByCompanyIdRepository,
  UnauthorizedUsersByCompanyIdResponseDto,
} from '../../../../src';
import { UnauthorizedUsersByCompanyIdMock } from '../../../entity';

export class FindUnauthorizedUsersByCompanyIdRepositoryMock
  implements FindUnauthorizedUsersByCompanyIdRepository
{
  inputMock = {} as FindUnauthorizedUsersByCompanyIdDto;
  async find(
    input: FindUnauthorizedUsersByCompanyIdDto
  ): Promise<UnauthorizedUsersByCompanyIdResponseDto> {
    this.inputMock = input;
    return UnauthorizedUsersByCompanyIdMock;
  }
}
