import { CreatePostInDatabaseDto } from '../../../../dto';

export interface CreateDraftPostRepository {
  create(input: CreatePostInDatabaseDto): Promise<string>;
}
