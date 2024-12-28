import { Company, FindCompanyByCnpjRepository } from '../../../../src';

export class FindCompanyByCnpjRepositoryMock
  implements FindCompanyByCnpjRepository
{
  outputMock = {} as Company;
  inputMock = '';
  async find(cnpj: string): Promise<Company> {
    this.inputMock = cnpj;
    return this.outputMock;
  }
}
