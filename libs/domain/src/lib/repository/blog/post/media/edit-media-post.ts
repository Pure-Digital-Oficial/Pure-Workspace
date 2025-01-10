import { EditMediaPostDto } from '../../../../dto';

export interface EditMediaPostRepository {
  edit(input: EditMediaPostDto): Promise<string>;
}
