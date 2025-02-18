import { PostInDatabaseBodyDto } from './post-in-database-body.dto';

export interface CreatePostInDatabaseDto {
  appId: string;
  loggedUserId: string;
  body: PostInDatabaseBodyDto;
}
