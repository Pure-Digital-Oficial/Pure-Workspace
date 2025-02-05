import { PostBodyDto } from './post-body.dto';

export interface CreatePostDto {
  appId: string;
  loggedUserId: string;
  body: PostBodyDto;
}
