import { Injectable } from '@nestjs/common';
import { CreateContactUs, CreateContactUsDto } from '@pure-workspace/domain';

@Injectable()
export class CreateContactUsService {
  constructor(private useCase: CreateContactUs) {}

  async create(input: CreateContactUsDto) {
    return await this.useCase.execute(input);
  }
}
