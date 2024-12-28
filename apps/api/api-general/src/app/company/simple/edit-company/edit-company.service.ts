import { Injectable } from '@nestjs/common';
import { EditCompany, EditCompanyDto } from '@pure-workspace/domain';

@Injectable()
export class EditCompanyService {
  constructor(private useCase: EditCompany) {}

  async edit(input: EditCompanyDto) {
    return await this.useCase.execute(input);
  }
}
