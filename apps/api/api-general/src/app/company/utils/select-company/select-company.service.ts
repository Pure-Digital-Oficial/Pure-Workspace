import { Injectable } from '@nestjs/common';
import { SelectCompany, SelectCompanyDto } from '@pure-workspace/domain';

@Injectable()
export class SelectCompanyService {
  constructor(private useCase: SelectCompany) {}

  async select(input: SelectCompanyDto) {
    return await this.useCase.execute(input);
  }
}
