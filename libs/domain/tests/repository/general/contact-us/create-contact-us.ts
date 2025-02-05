import { CreateContactUsDto, CreateContactUsRepository } from '../../../../src';
import { ContactUsMock } from '../../../entity/general/contact-us/contact-us.mock';

export class CreateContactUsRepositoryMock
  implements CreateContactUsRepository
{
  inputMock = {} as CreateContactUsDto;
  async create(input: CreateContactUsDto): Promise<string> {
    this.inputMock = input;
    return ContactUsMock.id;
  }
}
