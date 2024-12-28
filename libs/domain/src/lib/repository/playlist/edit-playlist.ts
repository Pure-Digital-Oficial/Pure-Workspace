import { EditPlaylistDto } from '../../dto';

export interface EditPlaylistRepository {
  edit(input: EditPlaylistDto): Promise<void>;
}
