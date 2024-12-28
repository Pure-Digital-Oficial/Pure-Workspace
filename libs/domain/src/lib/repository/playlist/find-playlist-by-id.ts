import { PlaylistResponseDto } from '../../dto';

export interface FindPlaylistByIdRepository {
  find(id: string): Promise<PlaylistResponseDto>;
}
