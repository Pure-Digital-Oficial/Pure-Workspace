import { DeletePlaylistFileDto } from '../../dto';

export interface DeletePlaylistFileRepository {
  delete(input: DeletePlaylistFileDto): Promise<void>;
}
