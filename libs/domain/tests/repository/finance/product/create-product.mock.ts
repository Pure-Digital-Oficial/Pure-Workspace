import { CreateProductDto, CreateProductRepository } from '../../../../src';
import { ProductMock } from '../../../entity';

export class CreateProductRepositoryMock implements CreateProductRepository {
  inputMock = {} as CreateProductDto;
  async create(input: CreateProductDto): Promise<string> {
    this.inputMock = input;
    return ProductMock.id;
  }
}
