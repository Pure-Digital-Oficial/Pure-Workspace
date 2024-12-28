import { CreateProductDto } from '../../../dto';

export interface CreateProductRepository {
  create(input: CreateProductDto): Promise<string>;
}
