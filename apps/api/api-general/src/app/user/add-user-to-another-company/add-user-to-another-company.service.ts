import { Injectable } from '@nestjs/common';
import {
  AddUserToAnotherCompany,
  AddUserToAnotherCompanyDto,
} from '@pure-workspace/domain';

@Injectable()
export class AddUserToAnotherCompanyService {
  constructor(private useCase: AddUserToAnotherCompany) {}

  async add(input: AddUserToAnotherCompanyDto) {
    return await this.useCase.execute(input);
  }
}
