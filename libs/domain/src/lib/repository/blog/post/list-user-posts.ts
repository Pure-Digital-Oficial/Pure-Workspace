import { ListPostsResponseDto, ListUserPostsDto } from '../../../dto';

export interface ListUserPostsRepository {
  list(input: ListUserPostsDto): Promise<ListPostsResponseDto>;
}
