import { Inject } from '@nestjs/common';
import {
  AddSchedulingToDeviceDto,
  AddSchedulingToDeviceRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class AddSchedulingToDeviceRepositoryImpl
  implements AddSchedulingToDeviceRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async add(input: AddSchedulingToDeviceDto): Promise<string> {
    const { idDevice, idScheduing } = input;

    const createdSchedulingToDevice =
      await this.prismaService.generalPrisma.scheduling_X_Device.create({
        data: {
          device_id: idDevice,
          scheduling_id: idScheduing,
        },
      });

    return `${createdSchedulingToDevice.scheduling_id}-${createdSchedulingToDevice.device_id}`;
  }
}
