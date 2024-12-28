import { Injectable } from '@nestjs/common';
import { ListSchedules, ListSchedulesDto } from '@pure-workspace/domain';

@Injectable()
export class ListSchedulesService {
  constructor(private useCase: ListSchedules) {}

  list(input: ListSchedulesDto) {
    return this.useCase.execute(input);
  }
}
