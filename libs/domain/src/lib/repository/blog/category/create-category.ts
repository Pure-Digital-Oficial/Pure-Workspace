import { CreateCategoryDto } from '../../../dto';

export interface CreateCategoryRepository {
  create(input: CreateCategoryDto): Promise<string>;
}
