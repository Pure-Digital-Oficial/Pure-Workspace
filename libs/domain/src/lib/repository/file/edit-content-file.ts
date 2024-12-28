import { EditContentFileDto } from '../../dto';

export interface EditContentFileRepository {
  edit(input: EditContentFileDto): Promise<void>;
}
