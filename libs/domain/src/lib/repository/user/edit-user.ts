import { EditUserDto } from '../../dto';

export interface EditUserRepository {
  edit(input: EditUserDto): Promise<string>;
}
