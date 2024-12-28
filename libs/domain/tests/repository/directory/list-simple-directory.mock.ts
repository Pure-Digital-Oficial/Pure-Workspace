import {
  ListSimpleDirectoryDto,
  ListSimpleDirectoryRepository,
  ListSimpleDirectoryResponseDto,
} from '../../../src';
import {
  DirectoryMock,
  ListSimpleDirectoryResponseDtoMock,
} from '../../entity';

export class ListSimpleDirectoryRespositoryMock
  implements ListSimpleDirectoryRepository
{
  inputMock = {} as ListSimpleDirectoryDto;
  async list(
    input: ListSimpleDirectoryDto
  ): Promise<ListSimpleDirectoryResponseDto> {
    this.inputMock = input;
    return ListSimpleDirectoryResponseDtoMock;
  }
}
