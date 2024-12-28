import {
  CompanyResponsibleResponseDto,
  FindCompanyResponsibleByDocumentRepository,
} from '../../../../src';

export class FindCompanyResponsibleByDocumentRepositoryMock
  implements FindCompanyResponsibleByDocumentRepository
{
  inputMock = '';
  outputMock = {} as CompanyResponsibleResponseDto;
  async find(document: string): Promise<CompanyResponsibleResponseDto> {
    this.inputMock = document;
    return this.outputMock;
  }
}
