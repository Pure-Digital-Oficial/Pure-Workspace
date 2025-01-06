import { PostResponseDto } from './post-response.dto';

export interface ListPostsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  posts: PostResponseDto[];
}
