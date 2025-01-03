import { CreatePostDto } from '../../../dto';

export interface CreatePostRepository {
  create(input: CreatePostDto): Promise<string>;
}
