import { Injectable } from '@nestjs/common';
import {
  FindSchedulingById,
  FindSchedulingByIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindSchedulingByIdService {
  constructor(private useCase: FindSchedulingById) {}

  async find(input: FindSchedulingByIdDto) {
    return await this.useCase.execute(input);
  }
}
