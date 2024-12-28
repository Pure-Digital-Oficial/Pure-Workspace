import { ChangeProductStatusDto } from '../../../dto';

export interface ChangeProductStatusRepository {
  change(input: ChangeProductStatusDto): Promise<string>;
}
