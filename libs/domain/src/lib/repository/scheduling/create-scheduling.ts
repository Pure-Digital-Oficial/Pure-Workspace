import { CreateSchedulingDto } from '../../dto';

export interface CreateSchedulingRepository {
  create(input: CreateSchedulingDto): Promise<string>;
}
