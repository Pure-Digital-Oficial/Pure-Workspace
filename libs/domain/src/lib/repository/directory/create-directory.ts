import { CreateDirectoryDto } from '../../dto';

export interface CreateDirectoryRepository {
  create(input: CreateDirectoryDto): Promise<string>;
}
