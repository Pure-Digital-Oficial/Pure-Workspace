import {
  DeleteCompanyByIdDto,
  DeleteCompanyByIdRepository,
} from '../../../../src';
import { CompanySimpleMock } from '../../../entity';

export class DeleteCompanyByIdRepositoryMock
  implements DeleteCompanyByIdRepository
{
  inputMock = {} as DeleteCompanyByIdDto;
  async delete(input: DeleteCompanyByIdDto): Promise<string> {
    this.inputMock = input;
    return CompanySimpleMock.id;
  }
}
