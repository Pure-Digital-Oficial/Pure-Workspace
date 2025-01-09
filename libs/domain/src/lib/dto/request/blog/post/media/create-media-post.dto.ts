import { UploadedFile } from '../../../../../entity';

export interface CreateMediaPostDto {
  loggedUserId: string;
  postId: string;
  thumbnail: string;
  file: UploadedFile;
}
