import {
  DeleteDraftPostDto,
  DeleteDraftPostRepository,
} from '../../../../../src';
import { PostMock } from '../../../../entity';
export class DeleteDraftPostRepositoryMock
  implements DeleteDraftPostRepository
{
  inputMock = {} as DeleteDraftPostDto;
  async delete(input: DeleteDraftPostDto): Promise<string> {
    this.inputMock = input;
    return PostMock.id;
  }
}
