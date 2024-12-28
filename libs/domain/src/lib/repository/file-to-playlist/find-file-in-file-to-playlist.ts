import { FindFileInFileToPlaylistDto } from '../../dto';

export interface FindFileInFileToPlaylistRepository {
  find(input: FindFileInFileToPlaylistDto): Promise<string>;
}
