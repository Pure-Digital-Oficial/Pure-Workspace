import { CategoryBodyDto } from './category-body.dto';

export interface EditCategoryDto {
  loggedUserId: string;
  id: string;
  body: CategoryBodyDto;
}
