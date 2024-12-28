import { ListProductDto, ListProductResponseDto } from '../../../dto';

export interface ListProductRepository {
  list(input: ListProductDto): Promise<ListProductResponseDto>;
}
