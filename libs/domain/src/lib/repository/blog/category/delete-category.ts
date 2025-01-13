import { DeleteCategoryDto } from '../../../dto';

export interface DeleteCategoryRepository {
  delete(input: DeleteCategoryDto): Promise<string>;
}
