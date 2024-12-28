import {
  CreateContentFileRepository,
  RegisterContentFileDto,
} from '../../../src';
import { ContentFileMock } from '../../entity';

export class CreateContentFileRepositoryMock
  implements CreateContentFileRepository
{
  inputMock: RegisterContentFileDto = {} as RegisterContentFileDto;
  async create(input: RegisterContentFileDto): Promise<string> {
    this.inputMock = input;
    return ContentFileMock.id;
  }
}
