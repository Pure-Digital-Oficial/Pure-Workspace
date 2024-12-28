import {
  ListPlaylistCategoryDto,
  ListPlaylistCategoryReponseDto,
} from '../../../dto';

export interface ListPlaylistCategoryRepository {
  list(input: ListPlaylistCategoryDto): Promise<ListPlaylistCategoryReponseDto>;
}
