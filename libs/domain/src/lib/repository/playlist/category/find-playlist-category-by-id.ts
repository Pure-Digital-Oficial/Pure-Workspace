import { PlaylistCategory } from '../../../entity';

export interface FindPlaylistCategoryByIdRepository {
  find(id: string): Promise<PlaylistCategory>;
}
