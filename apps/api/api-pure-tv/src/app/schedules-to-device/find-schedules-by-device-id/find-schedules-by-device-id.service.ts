import { Injectable } from '@nestjs/common';
import {
  FindSchedulesByDeviceId,
  FindSchedulesByDeviceIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindSchedulesByDeviceIdService {
  constructor(private useCase: FindSchedulesByDeviceId) {}

  async find(input: FindSchedulesByDeviceIdDto) {
    return await this.useCase.execute(input);
  }
}
