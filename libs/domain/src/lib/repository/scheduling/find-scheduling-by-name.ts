import { FindSchedulingByNameDto } from '../../dto';
import { Scheduling } from '../../entity';

export interface FindSchedulingByNameRepository {
  find(input: FindSchedulingByNameDto): Promise<Scheduling>;
}
