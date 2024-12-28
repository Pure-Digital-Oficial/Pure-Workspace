import { Injectable } from '@nestjs/common';
import {
  AddSchedulesToDevice,
  AddSchedulesToDeviceDto,
} from '@pure-workspace/domain';

@Injectable()
export class AddSchedulesToDeviceService {
  constructor(private useCase: AddSchedulesToDevice) {}

  async add(input: AddSchedulesToDeviceDto) {
    return await this.useCase.execute(input);
  }
}
