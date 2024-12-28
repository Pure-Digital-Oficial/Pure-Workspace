import { Injectable } from '@nestjs/common';
import {
  MoveSchedulesToAnotherDevice,
  MoveSchedulesToAnotherDeviceDto,
} from '@pure-workspace/domain';

@Injectable()
export class MoveSchedulesToAnotherDeviceService {
  constructor(private useCase: MoveSchedulesToAnotherDevice) {}

  async move(input: MoveSchedulesToAnotherDeviceDto) {
    return await this.useCase.execute(input);
  }
}
