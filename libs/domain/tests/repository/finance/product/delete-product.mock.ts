import { DeleteProductDto, DeleteProductRepository } from '../../../../src';
import { ProductMock } from '../../../entity';

export class DeleteProductRepositoryMock implements DeleteProductRepository {
  inputMock = {} as DeleteProductDto;
  async delete(input: DeleteProductDto): Promise<string> {
    this.inputMock = input;
    return ProductMock.id;
  }
}
