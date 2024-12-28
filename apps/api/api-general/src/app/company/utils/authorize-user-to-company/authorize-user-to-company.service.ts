import { Injectable } from '@nestjs/common';
import {
  AuthorizeUserToCompany,
  AuthorizeUserToCompanyDto,
} from '@pure-workspace/domain';

@Injectable()
export class AuthorizeUserToCompanyService {
  constructor(private useCase: AuthorizeUserToCompany) {}

  async auth(input: AuthorizeUserToCompanyDto) {
    return await this.useCase.execute(input);
  }
}
