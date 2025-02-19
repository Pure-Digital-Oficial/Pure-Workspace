import { SubCategoryBodyDto } from './sub-category-body.dto';

export interface EditSubCategoryDto {
  loggedUserId: string;
  id: string;
  body: SubCategoryBodyDto;
}
