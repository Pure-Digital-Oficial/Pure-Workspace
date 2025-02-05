import { PostBodyDto } from './post-body.dto';

export interface EditPostDto {
  loggedUserId: string;
  id: string;
  body: Omit<PostBodyDto, 'coverImage'>;
}
