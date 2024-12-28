import { FindSendingByIdRepository, SendingResponseDto } from '../../../../src';
import { SendingResponseMock } from '../../../entity';

export class FindSendingByIdRepositoryMock
  implements FindSendingByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<SendingResponseDto> {
    this.inputMock = id;
    return SendingResponseMock;
  }
}
