import {
  ListProductDto,
  ListProductRepository,
  ListProductResponseDto,
} from '../../../../src';
import { ListProductMock } from '../../../entity';

export class ListProductRepositoryMock implements ListProductRepository {
  inputMock = {} as ListProductDto;
  async list(input: ListProductDto): Promise<ListProductResponseDto> {
    this.inputMock = input;
    return ListProductMock;
  }
}
