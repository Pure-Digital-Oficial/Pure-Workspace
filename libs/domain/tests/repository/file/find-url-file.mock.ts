import { FindUrlFileDto, FindUrlFileRepository } from '../../../src';

export class FindUrlFileRepositoryMock implements FindUrlFileRepository {
  inputMock: FindUrlFileDto = {} as FindUrlFileDto;
  async find(input: FindUrlFileDto): Promise<string> {
    this.inputMock = input;
    return 'any_data';
  }
}
