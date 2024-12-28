import { FindUserByEmailDto } from '../../dto';
import { LoggedUser } from '../../entity';

export interface FindUserByEmailRepository {
  find(input: FindUserByEmailDto): Promise<LoggedUser>;
}
