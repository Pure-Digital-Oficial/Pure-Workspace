import { MoveFileToAnotherPlaylistDto } from '../../dto';

export interface MoveFileToAnotherPlaylistRepository {
  move(input: MoveFileToAnotherPlaylistDto): Promise<void>;
}
