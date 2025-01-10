import { ListPostsDto, ListPostsResponseDto } from '../../../dto';

export interface ListUserPostsRepository {
  list(input: ListPostsDto): Promise<ListPostsResponseDto>;
}
