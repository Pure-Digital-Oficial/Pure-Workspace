import { SubCategoryBodyDto } from './sub-category-body.dto';

export interface CreateSubCategoryDto {
  loggedUserId: string;
  body: SubCategoryBodyDto;
}
