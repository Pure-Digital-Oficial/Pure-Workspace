import {
  ListUsersByCompanyIdDto,
  ListUsersByCompanyIdRepository,
  ListUsersByCompanyIdResponseDto,
} from '../../../../src';
import { ListUsersByCompanyMock } from '../../../entity';

export class ListUsersByCompanyIdRepositoryMock
  implements ListUsersByCompanyIdRepository
{
  inputMock = {} as ListUsersByCompanyIdDto;
  async list(
    input: ListUsersByCompanyIdDto
  ): Promise<ListUsersByCompanyIdResponseDto> {
    this.inputMock = input;
    return ListUsersByCompanyMock;
  }
}
