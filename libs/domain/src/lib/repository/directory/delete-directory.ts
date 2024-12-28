import { DeleteDirectoryDto } from '../../dto';

export interface DeleteDirectoryRepository {
  delete(input: DeleteDirectoryDto): Promise<void>;
}
