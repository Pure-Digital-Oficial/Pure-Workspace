import {
  CreateMediaPostDto,
  CreateMediaPostRepository,
} from '../../../../../src';
import { MediaPostMock } from '../../../../entity';

export class CreateMediaPostRepositoryMock
  implements CreateMediaPostRepository
{
  inputMock = {} as CreateMediaPostDto;
  async create(input: CreateMediaPostDto): Promise<string> {
    this.inputMock = input;
    return MediaPostMock.id;
  }
}
