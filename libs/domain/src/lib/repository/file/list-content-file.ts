import { ListContentFileResponseDto, ListContentFileDto } from '../../dto';

export interface ListContentFileRepository {
  list(input: ListContentFileDto): Promise<ListContentFileResponseDto>;
}
