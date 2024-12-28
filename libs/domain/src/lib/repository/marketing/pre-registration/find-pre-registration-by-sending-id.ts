import { PreRegistartionResponseDto } from '../../../dto';

export interface FindPreRegistrationBySendingIdRepository {
  find(id: string): Promise<PreRegistartionResponseDto>;
}
