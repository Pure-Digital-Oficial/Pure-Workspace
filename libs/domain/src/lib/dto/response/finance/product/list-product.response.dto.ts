import { ProductResponseDto } from './product.response.dto';

export interface ListProductResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  products: ProductResponseDto[];
}
