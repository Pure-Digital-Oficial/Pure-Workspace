import { EditContentFileDto, EditContentFileRepository } from '../../../src';

export class EditContentFileRepositoryMock
  implements EditContentFileRepository
{
  inputMock: EditContentFileDto = {} as EditContentFileDto;
  async edit(input: EditContentFileDto): Promise<void> {
    this.inputMock = input;
  }
}
