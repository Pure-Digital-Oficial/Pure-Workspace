import { MediaPostResponseDto } from '../../../../dto';

export interface FindMediaPostByIdRepository {
  find(id: string): Promise<MediaPostResponseDto>;
}
