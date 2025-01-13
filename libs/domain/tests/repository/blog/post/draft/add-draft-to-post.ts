import {
  AddDraftToPostDto,
  AddDraftToPostRepository,
} from '../../../../../src';
import { PostMock } from '../../../../entity';

export class AddDraftToPostRepositoryMock implements AddDraftToPostRepository {
  inputMock = {} as AddDraftToPostDto;
  async add(input: AddDraftToPostDto): Promise<string> {
    this.inputMock = input;
    return PostMock.id;
  }
}
