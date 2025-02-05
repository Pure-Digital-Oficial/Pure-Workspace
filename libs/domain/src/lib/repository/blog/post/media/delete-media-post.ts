import { DeleteMediaPostDto } from '../../../../dto';

export interface DeleteMediaPostRepository {
  delete(input: DeleteMediaPostDto): Promise<string>;
}
