import { DeleteUserByIdDto } from '../../dto';

export interface DeleteUserByIdRepository {
  delete(input: DeleteUserByIdDto): Promise<string>;
}
