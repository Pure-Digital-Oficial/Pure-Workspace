import { UploadedFile } from '../../../../../entity';

export interface CreateMediasPostDto {
  loggedUserId: string;
  postId: string;
  files: UploadedFile[];
}
