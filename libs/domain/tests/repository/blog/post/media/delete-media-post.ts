import {
  DeleteMediaPostDto,
  DeleteMediaPostRepository,
} from '../../../../../src';
import { MediaPostMock } from '../../../../entity';

export class DeleteMediaPostRepositoryMock
  implements DeleteMediaPostRepository
{
  inputMock = {} as DeleteMediaPostDto;
  async delete(input: DeleteMediaPostDto): Promise<string> {
    this.inputMock = input;
    return MediaPostMock.id;
  }
}
