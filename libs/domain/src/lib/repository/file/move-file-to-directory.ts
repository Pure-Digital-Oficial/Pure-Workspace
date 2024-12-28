import { MoveFileToDirectoryDto } from '../../dto';

export interface MoveFileToDirectoryRepository {
  move(input: MoveFileToDirectoryDto): Promise<void>;
}
