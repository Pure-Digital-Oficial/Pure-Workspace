import { CreatePostDto } from '../../../dto';

export interface CreateDraftPostRepository {
  create(input: CreatePostDto): Promise<string>;
}
