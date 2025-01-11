import { ListCategoryDto, ListCategoryResponseDto } from '../../../dto';

export interface ListCategoryRepository {
  list(input: ListCategoryDto): Promise<ListCategoryResponseDto>;
}
