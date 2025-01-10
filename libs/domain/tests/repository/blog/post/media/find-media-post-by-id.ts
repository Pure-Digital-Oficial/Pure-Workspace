import {
  FindMediaPostByIdRepository,
  MediaPostResponseDto,
} from '../../../../../src';
import { MediaPostMock } from '../../../../entity';

export class FindMediaPostByIdRepositoryMock
  implements FindMediaPostByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<MediaPostResponseDto> {
    this.inputMock = id;
    return MediaPostMock;
  }
}
