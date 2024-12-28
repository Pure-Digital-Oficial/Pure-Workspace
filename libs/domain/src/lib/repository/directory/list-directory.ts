import { ListDirectoryDto, ListDirectoryResponseDto } from '../../dto';

export interface ListDirectoryRepository {
  list(input: ListDirectoryDto): Promise<ListDirectoryResponseDto>;
}
