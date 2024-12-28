import { Injectable } from '@nestjs/common';
import {
  RemoveUserAccessToTheCompany,
  RemoveUserAccessToTheCompanyDto,
} from '@pure-workspace/domain';

@Injectable()
export class RemoveUserAccessToTheCompanyService {
  constructor(private useCase: RemoveUserAccessToTheCompany) {}

  async remove(input: RemoveUserAccessToTheCompanyDto) {
    return await this.useCase.execute(input);
  }
}
