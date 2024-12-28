import { Injectable } from '@nestjs/common';
import { DeleteDevice, DeleteDeviceDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteDeviceService {
  constructor(private useCase: DeleteDevice) {}

  async delete(input: DeleteDeviceDto) {
    return await this.useCase.execute(input);
  }
}
