import { CreateMediaPostDto } from '../../../../dto';

export interface CreateMediasPostRepository {
  create(input: CreateMediaPostDto): Promise<string>;
}
