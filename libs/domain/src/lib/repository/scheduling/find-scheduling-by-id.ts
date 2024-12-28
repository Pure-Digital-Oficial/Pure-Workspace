import { Scheduling } from '../../entity';

export interface FindSchedulingByIdRepository {
  find(id: string): Promise<Scheduling>;
}
