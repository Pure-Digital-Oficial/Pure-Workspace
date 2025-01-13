import { AddDraftToPostDto } from '../../../../dto';

export interface AddDraftToPostRepository {
  add(input: AddDraftToPostDto): Promise<string>;
}
