import { ListDirectoryDto, ListDirectoryResponseDto } from '../../../src';
import { ListDirectoryResponseMock } from '../../entity';

export class ListDirectoryRepositoryMock {
  inputMock = {} as ListDirectoryDto;
  async list(input: ListDirectoryDto): Promise<ListDirectoryResponseDto> {
    this.inputMock = input;
    return ListDirectoryResponseMock;
  }
}
