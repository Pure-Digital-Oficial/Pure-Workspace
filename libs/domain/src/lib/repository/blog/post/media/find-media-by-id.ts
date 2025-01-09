import { MediaPostResponseDto } from '../../../../dto';

export interface FindMediaByIdRepository {
  find(id: string): Promise<MediaPostResponseDto>;
}
