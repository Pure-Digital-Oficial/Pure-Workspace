import {
  UploadContentFileDto,
  UploadContentFileRepository,
} from '../../../src';
import { uploadContentFileMock } from '../../entity';

export class UploadContentFileRepositoryMock
  implements UploadContentFileRepository
{
  inputMock = {} as UploadContentFileDto;
  async upload(input: UploadContentFileDto): Promise<string> {
    this.inputMock = input;
    return uploadContentFileMock;
  }
}
