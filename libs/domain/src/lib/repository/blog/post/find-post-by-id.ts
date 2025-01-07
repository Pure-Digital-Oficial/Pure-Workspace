import { PostResponseDto } from '../../../dto';

export interface FindPostByIdRepository {
  find(id: string): Promise<PostResponseDto>;
}
