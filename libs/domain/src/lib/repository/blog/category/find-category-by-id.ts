import { CategoryResponseDto } from '../../../dto';

export interface FindCategoryByIdRepository {
  find(id: string): Promise<CategoryResponseDto>;
}
