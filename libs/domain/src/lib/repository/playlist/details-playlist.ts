import { DetailsPlaylistDto, PlaylistResponseDto } from '../../dto';

export interface DetailsPlaylistRepository {
  details(input: DetailsPlaylistDto): Promise<PlaylistResponseDto>;
}
