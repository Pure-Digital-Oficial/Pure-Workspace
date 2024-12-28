import {
  ListSimpleDirectoryDto,
  ListSimpleDirectoryResponseDto,
} from '../../dto';

export interface ListSimpleDirectoryRepository {
  list(input: ListSimpleDirectoryDto): Promise<ListSimpleDirectoryResponseDto>;
}
