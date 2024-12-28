import {
  FindUserAndCompanyIdDto,
  FindUserIdByCompanyIdRepository,
} from '../../../../src';
import { CompanyMock, userMock } from '../../../entity';

export class FindUserIdByCompanyIdRepositoryMock
  implements FindUserIdByCompanyIdRepository
{
  inputMock = {} as FindUserAndCompanyIdDto;
  async find(input: FindUserAndCompanyIdDto): Promise<string> {
    this.inputMock = input;
    return `${userMock.userId}-${CompanyMock.simple.id}`;
  }
}
