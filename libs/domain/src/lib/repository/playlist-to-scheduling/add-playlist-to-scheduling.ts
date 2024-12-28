import { PlaylistToSchedulingDto } from '../../dto';

export interface AddPlaylistToSchedulingRepository {
  add(input: PlaylistToSchedulingDto): Promise<string>;
}
