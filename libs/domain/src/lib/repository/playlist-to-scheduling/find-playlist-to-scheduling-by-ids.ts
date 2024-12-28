import { PlaylistToSchedulingDto } from '../../dto';

export interface FindPlaylistToSchedulingByIdsRepository {
  find(input: PlaylistToSchedulingDto): Promise<string>;
}
