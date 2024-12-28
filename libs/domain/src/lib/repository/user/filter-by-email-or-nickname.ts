import { User } from '../../entity';

export interface FilterByEmailOrNicknameRepository {
  filter(input: string): Promise<User>;
}
