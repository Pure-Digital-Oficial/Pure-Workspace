import { Inject } from '@nestjs/common';
import {
  FindSchedulingToDeviceByIdsDto,
  FindSchedulingToDeviceByIdsRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindSchedulingToDeviceByIdsRepositoryImpl
  implements FindSchedulingToDeviceByIdsRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindSchedulingToDeviceByIdsDto): Promise<string> {
    const filteredSchedulingToDevice =
      await this.prismaService.generalPrisma.scheduling_X_Device.findMany({
        where: {
          device_id: input.idDevice,
          scheduling_id: input.idScheduling,
        },
      });

    return filteredSchedulingToDevice[0]?.device_id
      ? `${filteredSchedulingToDevice[0].scheduling_id}-${filteredSchedulingToDevice[0].device_id}`
      : '';
  }
}
