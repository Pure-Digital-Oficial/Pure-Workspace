import { EditSubCategoryDto } from '../../../dto';

export interface EditSubCategoryRepository {
  edit(input: EditSubCategoryDto): Promise<string>;
}
