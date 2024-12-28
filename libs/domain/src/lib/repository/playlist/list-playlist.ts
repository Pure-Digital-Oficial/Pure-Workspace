import { ListPlaylistDto, ListPlaylistResponseDto } from '../../dto';

export interface ListPlaylistRepository {
  list(input: ListPlaylistDto): Promise<ListPlaylistResponseDto>;
}
