import {
  GenerateThumbnailDto,
  GenerateThumbnailRepository,
} from '../../../src';

export class GenerateThumbnailRepositoryMock
  implements GenerateThumbnailRepository
{
  outputMock = {} as Buffer;
  inputMock = {} as GenerateThumbnailDto;
  async generate(file: GenerateThumbnailDto): Promise<Buffer> {
    this.inputMock = file;
    return this.outputMock;
  }
}
