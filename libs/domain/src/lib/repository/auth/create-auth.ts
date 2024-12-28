import { CreateAuthDto } from '../../dto';

export interface CreateAuthRepository {
  create(input: CreateAuthDto): Promise<void>;
}
