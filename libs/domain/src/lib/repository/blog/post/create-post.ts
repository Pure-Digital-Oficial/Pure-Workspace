import { CreatePostInDatabaseDto } from '../../../dto';

export interface CreatePostRepository {
  create(input: CreatePostInDatabaseDto): Promise<string>;
}
