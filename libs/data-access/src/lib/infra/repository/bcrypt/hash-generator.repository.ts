import { HashGeneratorRepository } from '@pure-workspace/domain';
import * as bcrypt from 'bcrypt';

export class HashGeneratorImpl implements HashGeneratorRepository {
  async hash(input: string): Promise<string> {
    return bcrypt.hash(input, 10);
  }
}
