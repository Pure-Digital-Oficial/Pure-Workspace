import {
  ListCategoryRepository,
  ListCategoryDto,
  ListCategoryResponseDto,
} from '../../../../src';
import { ListCategoryResponseMock } from '../../../entity';

export class ListCategoryRepositoryMock implements ListCategoryRepository {
  inputMock = {} as ListCategoryDto;
  async list(input: ListCategoryDto): Promise<ListCategoryResponseDto> {
    this.inputMock = input;
    return ListCategoryResponseMock;
  }
}
