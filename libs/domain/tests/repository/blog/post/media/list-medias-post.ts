import {
  ListMediasPostDto,
  ListMediasPostRepository,
  ListMediasPostResponseDto,
} from '../../../../../src';
import { ListMediasPostResponseMock } from '../../../../entity';

export class ListMediasPostRepositoryMock implements ListMediasPostRepository {
  inputMock = {} as ListMediasPostDto;
  async list(input: ListMediasPostDto): Promise<ListMediasPostResponseDto> {
    this.inputMock = input;
    return ListMediasPostResponseMock;
  }
}
