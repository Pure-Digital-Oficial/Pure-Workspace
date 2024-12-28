import { ProductResponseDto } from '../../../dto';

export interface FindProductByIdRepository {
  find(id: string): Promise<ProductResponseDto>;
}
