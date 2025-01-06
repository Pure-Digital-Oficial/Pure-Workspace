import { DeletePostDto } from '../../../dto';

export interface DeletePostRepository {
  delete(input: DeletePostDto): Promise<string>;
}
