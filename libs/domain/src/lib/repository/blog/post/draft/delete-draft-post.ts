import { DeleteDraftPostDto } from '../../../../dto';

export interface DeleteDraftPostRepository {
  delete(input: DeleteDraftPostDto): Promise<string>;
}
