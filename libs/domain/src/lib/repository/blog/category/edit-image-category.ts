import { EditImageCategoryDto } from '../../../dto';

export interface EditImageCategoryRepository {
  edit(input: EditImageCategoryDto): Promise<string>;
}
