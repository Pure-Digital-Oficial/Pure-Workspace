import { ListSimpleStateDto, ListSimpleStateResponseDto } from '../../../dto';

export interface ListSimpleStateRepository {
  list(input: ListSimpleStateDto): Promise<ListSimpleStateResponseDto[]>;
}
