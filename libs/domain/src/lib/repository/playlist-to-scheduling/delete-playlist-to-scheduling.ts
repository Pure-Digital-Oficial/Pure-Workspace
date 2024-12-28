import { DeletePlaylistToSchedulingDto } from '../../dto';

export interface DeletePlaylistToSchedulingRepository {
  delete(input: DeletePlaylistToSchedulingDto): Promise<void>;
}
