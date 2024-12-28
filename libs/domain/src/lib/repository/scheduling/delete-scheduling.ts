import { DeleteSchedulingDto } from '../../dto';

export interface DeleteSchedulingRepository {
  delete(input: DeleteSchedulingDto): Promise<void>;
}
