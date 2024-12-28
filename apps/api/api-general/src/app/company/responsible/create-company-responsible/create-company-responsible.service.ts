import { Injectable } from '@nestjs/common';
import {
  CreateCompanyResponsible,
  CreateCompanyResponsibleDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreateCompanyResponsibleService {
  constructor(private useCase: CreateCompanyResponsible) {}

  async create(input: CreateCompanyResponsibleDto) {
    return await this.useCase.execute(input);
  }
}
