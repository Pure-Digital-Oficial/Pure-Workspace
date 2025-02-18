import { CategoryResponseDto } from './category-response.dto';

export interface ListCategoryResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  categories: CategoryResponseDto[];
}
