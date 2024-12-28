import { StateResponseDto } from '../../dto';

export interface FindStateByIdRepository {
  find(id: string): Promise<StateResponseDto>;
}
