import { FindProductByNameDto, ProductResponseDto } from '../../../dto';

export interface FindProductByNameRespository {
  find(input: FindProductByNameDto): Promise<ProductResponseDto>;
}
