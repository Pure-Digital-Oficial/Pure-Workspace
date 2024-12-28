import { Injectable } from '@nestjs/common';
import {
  UnauthorizeUserToCompany,
  UnauthorizeUserToCompanyDto,
} from '@pure-workspace/domain';

@Injectable()
export class UnauthorizeUserToCompanyService {
  constructor(private useCase: UnauthorizeUserToCompany) {}

  async auth(input: UnauthorizeUserToCompanyDto) {
    return await this.useCase.execute(input);
  }
}
