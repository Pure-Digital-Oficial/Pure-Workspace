import {
  ListCompaniesByUserIdDto,
  ListCompaniesByUserIdRepository,
  ListCompanyResponseDto,
} from '../../../src';
import { ListCompanyMock } from '../../entity';

export class ListCompaniesByUserIdRepositoryMock
  implements ListCompaniesByUserIdRepository
{
  inputMock = {} as ListCompaniesByUserIdDto;
  async list(input: ListCompaniesByUserIdDto): Promise<ListCompanyResponseDto> {
    this.inputMock = input;
    return ListCompanyMock;
  }
}
