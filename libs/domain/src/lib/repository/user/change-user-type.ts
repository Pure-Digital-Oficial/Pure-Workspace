import { ChangeUserTypeDto } from '../../dto';

export interface ChangeUserTypeRepository {
  change(input: ChangeUserTypeDto): Promise<string>;
}
