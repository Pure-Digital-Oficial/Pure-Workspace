import {
  ListPlaylistBySchedulingIdDto,
  ListPlaylistResponseDto,
} from '../../dto';

export interface ListPlaylistBySchedulingIdRepository {
  list(input: ListPlaylistBySchedulingIdDto): Promise<ListPlaylistResponseDto>;
}
