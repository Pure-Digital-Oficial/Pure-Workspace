import { Injectable } from '@nestjs/common';
import { EditDevice, EditDeviceDto } from '@pure-workspace/domain';

@Injectable()
export class EditDeviceService {
  constructor(private useCase: EditDevice) {}

  async edit(input: EditDeviceDto) {
    return await this.useCase.execute(input);
  }
}
