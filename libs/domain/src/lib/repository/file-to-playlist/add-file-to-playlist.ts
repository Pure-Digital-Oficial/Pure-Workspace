import { AddFileToPlaylistDto } from '../../dto';

export interface AddFileToPlaylistRepository {
  add(input: AddFileToPlaylistDto): Promise<string[]>;
}
