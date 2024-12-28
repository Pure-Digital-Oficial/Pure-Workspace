import { SendingResponseDto } from '../../../dto';

export interface FindSendingByIdRepository {
  find(id: string): Promise<SendingResponseDto>;
}
