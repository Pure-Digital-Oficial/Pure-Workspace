import {
  ListMediasPostDto,
  ListMediasPostResponseDto,
} from 'libs/domain/src/lib/dto';

export interface ListMediasPostRepository {
  list(input: ListMediasPostDto): Promise<ListMediasPostResponseDto>;
}
