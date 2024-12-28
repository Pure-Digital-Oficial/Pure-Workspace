import { EditDirectoryDto } from '../../dto/request/directory/edit-directory.dto';

export interface EditDirectoryRepository {
  edit(input: EditDirectoryDto): Promise<string>;
}
