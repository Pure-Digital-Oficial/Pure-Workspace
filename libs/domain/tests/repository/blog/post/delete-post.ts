import { DeletePostDto, DeletePostRepository } from '../../../../src';
import { PostMock } from '../../../entity';

export class DeletePostRepositoryMock implements DeletePostRepository {
  inputMock = {} as DeletePostDto;
  async delete(input: DeletePostDto): Promise<string> {
    this.inputMock = input;
    return PostMock.id;
  }
}
