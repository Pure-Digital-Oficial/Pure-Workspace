import { CreatePlaylistDto } from '../../dto';

export interface CreatePlaylistRepository {
  create(input: CreatePlaylistDto): Promise<string>;
}
