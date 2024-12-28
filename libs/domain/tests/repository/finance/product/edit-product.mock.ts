import { EditProductDto, EditProductRepository } from '../../../../src';
import { ProductMock } from '../../../entity';

export class EditProductRepositoryMock implements EditProductRepository {
  inputMock = {} as EditProductDto;
  async edit(input: EditProductDto): Promise<string> {
    this.inputMock = input;
    return ProductMock.id;
  }
}
