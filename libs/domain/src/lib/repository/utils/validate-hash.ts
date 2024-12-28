import { ValidateHashDto } from '../../dto';

export interface ValidateHashRepository {
  validate(input: ValidateHashDto): Promise<boolean>;
}
