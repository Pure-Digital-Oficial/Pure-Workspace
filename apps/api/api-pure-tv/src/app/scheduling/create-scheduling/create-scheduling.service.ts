import { Injectable } from '@nestjs/common';
import { CreateScheduling, CreateSchedulingDto } from '@pure-workspace/domain';

@Injectable()
export class CreateSchedulingService {
  constructor(private useCase: CreateScheduling) {}

  async create(input: CreateSchedulingDto) {
    return await this.useCase.execute(input);
  }
}
