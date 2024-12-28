import { Inject } from '@nestjs/common';
import {
  MoveSchedulingToAnotherDeviceDto,
  MoveSchedulingToAnotherDeviceRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class MoveSchedulingToAnotherDeviceRepositoryImpl
  implements MoveSchedulingToAnotherDeviceRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async move(input: MoveSchedulingToAnotherDeviceDto): Promise<string> {
    const { newDeviceId, oldDeviceId, schedulingId } = input;

    const updatedSchedulingToDevice =
      await this.prismaService.generalPrisma.scheduling_X_Device.update({
        where: {
          device_id_scheduling_id: {
            device_id: oldDeviceId,
            scheduling_id: schedulingId,
          },
        },
        data: {
          device_id: newDeviceId,
        },
        select: {
          scheduling_id: true,
          device_id: true,
        },
      });

    return `${updatedSchedulingToDevice.scheduling_id}-${updatedSchedulingToDevice.device_id}`;
  }
}
