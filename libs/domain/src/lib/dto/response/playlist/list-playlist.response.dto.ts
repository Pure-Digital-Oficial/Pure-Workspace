import { Playlist } from '../../../entity';

export interface ListPlaylistResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  playlists: Playlist[];
}
