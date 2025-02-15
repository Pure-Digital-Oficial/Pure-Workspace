import { UploadedFile } from '../../../../entity';

export interface EditImageCategoryDto {
  loggedUserId: string;
  categoryId: string;
  image: UploadedFile;
}
