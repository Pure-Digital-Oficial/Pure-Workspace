import { DeleteProductDto } from '../../../dto';

export interface DeleteProductRepository {
  delete(input: DeleteProductDto): Promise<string>;
}
