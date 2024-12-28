import {
  FindUserAndCompanyIdDto,
  FindUserIdByCompanyIdRepository,
} from '../../../../src';

export class FindUserIdByCompanyIdRepositoryEmptyMock
  implements FindUserIdByCompanyIdRepository
{
  inputMock = {} as FindUserAndCompanyIdDto;
  async find(input: FindUserAndCompanyIdDto): Promise<string> {
    this.inputMock = input;
    return '';
  }
}
