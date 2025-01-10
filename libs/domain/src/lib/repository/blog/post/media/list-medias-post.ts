import { ListMediasPostDto, ListMediasPostResponseDto } from '../../../../dto';

export interface ListMediasPostRepository {
  list(input: ListMediasPostDto): Promise<ListMediasPostResponseDto>;
}
