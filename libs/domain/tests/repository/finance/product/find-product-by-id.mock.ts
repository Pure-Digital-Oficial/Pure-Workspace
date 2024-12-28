import { FindProductByIdRepository, ProductResponseDto } from '../../../../src';
import { ProductMock } from '../../../entity';

export class FindProductByIdRepositoryMock
  implements FindProductByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<ProductResponseDto> {
    this.inputMock = id;
    return ProductMock;
  }
}
