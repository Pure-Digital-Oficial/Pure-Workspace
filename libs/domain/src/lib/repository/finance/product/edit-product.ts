import { EditProductDto } from '../../../dto';

export interface EditProductRepository {
  edit(input: EditProductDto): Promise<string>;
}
