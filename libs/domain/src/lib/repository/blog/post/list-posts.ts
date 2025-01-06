import { ListPostsDto, ListPostsResponseDto } from '../../../dto';

export interface ListPostsRepository {
  list(input: ListPostsDto): Promise<ListPostsResponseDto>;
}
