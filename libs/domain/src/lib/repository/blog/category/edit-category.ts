import { EditCategoryDto } from '../../../dto';

export interface EditCategoryRepository {
  edit(input: EditCategoryDto): Promise<string>;
}
