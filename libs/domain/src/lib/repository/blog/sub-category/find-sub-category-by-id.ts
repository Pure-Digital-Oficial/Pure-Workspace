import { SubCategoryResponseDto } from '../../../dto';

export interface FindSubCategoryByIdRepository {
  find(id: string): Promise<SubCategoryResponseDto>;
}
