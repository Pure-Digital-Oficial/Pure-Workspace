import {
  FindPreRegistrationByIdRepository,
  PreRegistartionResponseDto,
} from '../../../../src';
import { PreRegistartionResponseMock } from '../../../entity';

export class FindPreRegistrationByIdRepositoryMock
  implements FindPreRegistrationByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<PreRegistartionResponseDto> {
    this.inputMock = id;
    return PreRegistartionResponseMock;
  }
}
