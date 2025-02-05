import { CreateMediaPostDto } from '../../../../dto';

export interface CreateMediaPostRepository {
  create(input: CreateMediaPostDto): Promise<string>;
}
