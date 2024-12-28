import {
  CreatePreRegistrationDto,
  CreatePreRegistrationRepository,
} from '../../../../src';
import { PreRegistrationMock } from '../../../entity';

export class CreatePreRegistrationRepositoryMock
  implements CreatePreRegistrationRepository
{
  inputMock = {} as CreatePreRegistrationDto;
  async create(input: CreatePreRegistrationDto): Promise<string> {
    this.inputMock = input;
    return PreRegistrationMock.id;
  }
}
