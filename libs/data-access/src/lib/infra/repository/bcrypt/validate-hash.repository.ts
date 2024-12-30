import {
  ValidateHashDto,
  ValidateHashRepository,
} from '@pure-workspace/domain';
import * as bcrypt from 'bcrypt';

export class ValidateHashRepositoryImpl implements ValidateHashRepository {
  async validate(input: ValidateHashDto): Promise<boolean> {
    return await bcrypt.compare(input.key, input.hash);
  }
}
