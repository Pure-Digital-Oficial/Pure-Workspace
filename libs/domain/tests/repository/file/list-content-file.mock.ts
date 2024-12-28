import {
  ListContentFileRepository,
  ListContentFileDto,
  ListContentFileResponseDto,
} from '../../../src';
import { ListContentFileReponseMock } from '../../entity';

export class ListContentFileRepositoryMock
  implements ListContentFileRepository
{
  listMock = {} as ListContentFileDto;
  async list(input: ListContentFileDto): Promise<ListContentFileResponseDto> {
    this.listMock = input;
    return ListContentFileReponseMock;
  }
}
