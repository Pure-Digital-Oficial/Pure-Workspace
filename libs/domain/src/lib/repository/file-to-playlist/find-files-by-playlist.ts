import {
  FindFilesByPlaylistDto,
  FindFilesByPlaylistResponseDto,
} from '../../dto';

export interface FindFilesByPlaylistRepository {
  find(input: FindFilesByPlaylistDto): Promise<FindFilesByPlaylistResponseDto>;
}
