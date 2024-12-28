import { Injectable } from '@nestjs/common';
import {
  EditCompanyResponsible,
  EditCompanyResponsibleDto,
} from '@pure-workspace/domain';

@Injectable()
export class EditCompanyResponsibleService {
  constructor(private useCase: EditCompanyResponsible) {}

  async edit(input: EditCompanyResponsibleDto) {
    return await this.useCase.execute(input);
  }
}
