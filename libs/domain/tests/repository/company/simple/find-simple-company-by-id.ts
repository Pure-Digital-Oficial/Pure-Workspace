import {
  CompanySimpleResponseDto,
  FindSimpleCompanyByIdRepository,
  FindSimpleCompanyByIdDto,
} from '../../../../src';
import { CompanySimpleMock } from '../../../entity';

export class FindSimpleCompanyByIdRepositoryMock
  implements FindSimpleCompanyByIdRepository
{
  inputMock = {} as FindSimpleCompanyByIdDto;
  async find(
    input: FindSimpleCompanyByIdDto
  ): Promise<CompanySimpleResponseDto> {
    this.inputMock = input;
    return CompanySimpleMock;
  }
}
