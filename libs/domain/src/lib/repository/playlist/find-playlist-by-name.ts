import { FindPlaylistByNameDto } from '../../dto';
import { Playlist } from '../../entity';

export interface FindPlaylistByNameRepository {
  find(input: FindPlaylistByNameDto): Promise<Playlist>;
}
