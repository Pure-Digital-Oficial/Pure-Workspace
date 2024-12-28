import { Injectable } from '@nestjs/common';
import { FindDeviceById, FindDeviceByIdDto } from '@pure-workspace/domain';

@Injectable()
export class FindDeviceByIdService {
  constructor(private useCase: FindDeviceById) {}

  async find(input: FindDeviceByIdDto) {
    return await this.useCase.execute(input);
  }
}
