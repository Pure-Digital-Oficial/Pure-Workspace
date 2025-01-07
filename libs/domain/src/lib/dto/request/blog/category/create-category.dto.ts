import { CategoryBodyDto } from './category-body.dto';

export interface CreateCategoryDto {
  loggedUserId: string;
  body: CategoryBodyDto;
}
