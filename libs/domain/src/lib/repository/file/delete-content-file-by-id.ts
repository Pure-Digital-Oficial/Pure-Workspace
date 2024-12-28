import { DeleteContentFileByIdDto } from '../../dto';

export interface DeleteContentFileByIdRepository {
  delete(input: DeleteContentFileByIdDto): Promise<void>;
}
