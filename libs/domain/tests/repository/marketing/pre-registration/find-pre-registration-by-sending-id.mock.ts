import {
  FindPreRegistrationBySendingIdRepository,
  PreRegistartionResponseDto,
} from '../../../../src';
import { PreRegistartionResponseMock } from '../../../entity';

export class FindPreRegistrationBySendingIdRepositoryMock
  implements FindPreRegistrationBySendingIdRepository
{
  inputMock = '';
  async find(id: string): Promise<PreRegistartionResponseDto> {
    this.inputMock = id;
    return PreRegistartionResponseMock;
  }
}
