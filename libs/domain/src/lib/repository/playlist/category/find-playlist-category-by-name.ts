import { FindPlaylistCategoryByNameDto } from '../../../dto';
import { PlaylistCategory } from '../../../entity';

export interface FindPlaylistCategoryByNameRepository {
  find(input: FindPlaylistCategoryByNameDto): Promise<PlaylistCategory>;
}
