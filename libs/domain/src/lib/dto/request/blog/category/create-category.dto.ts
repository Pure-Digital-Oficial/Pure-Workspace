import { UploadedFile } from '../../../../entity';
import { CategoryBodyDto } from './category-body.dto';

export interface CreateCategoryDto {
  loggedUserId: string;
  body: CategoryBodyDto;
  // name: string;
  // description: string;
  file: UploadedFile;
}
