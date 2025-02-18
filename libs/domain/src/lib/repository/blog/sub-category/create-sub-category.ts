import { CreateSubCategoryDto } from '../../../dto';

export interface CreateSubCategoryRepository {
  create(input: CreateSubCategoryDto): Promise<string>;
}
