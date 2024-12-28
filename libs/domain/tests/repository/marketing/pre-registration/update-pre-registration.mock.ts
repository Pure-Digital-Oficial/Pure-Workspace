import {
  UpdatePreRegistrationDto,
  UpdatePreRegistrationRepository,
} from '../../../../src';
import { PreRegistartionResponseMock } from '../../../entity';

export class UpdatePreRegistrationRepositoryMock
  implements UpdatePreRegistrationRepository
{
  inputMock = {} as UpdatePreRegistrationDto;
  async update(input: UpdatePreRegistrationDto): Promise<string> {
    this.inputMock = input;
    return PreRegistartionResponseMock.id;
  }
}
