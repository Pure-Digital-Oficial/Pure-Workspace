import { PreRegistartionResponseDto } from '../../../dto';

export interface FindPreRegistrationByIdRepository {
  find(id: string): Promise<PreRegistartionResponseDto>;
}
