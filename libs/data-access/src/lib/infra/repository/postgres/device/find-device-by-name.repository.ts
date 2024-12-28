import { Inject } from '@nestjs/common';
import {
  Device,
  FindDeviceByNameDto,
  FindDeviceByNameRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindDeviceByNameRepositoryImpl
  implements FindDeviceByNameRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindDeviceByNameDto): Promise<Device> {
    const { name, loggedUserId } = input;
    const filteredDevice =
      await this.prismaService.generalPrisma.device.findFirst({
        where: {
          name: name,
          user_id: loggedUserId,
        },
        select: {
          device_id: true,
          name: true,
          created_at: true,
          user: {
            select: {
              nick_name: true,
            },
          },
        },
      });

    return {
      createdAt: filteredDevice?.created_at ?? new Date(),
      createdBy: filteredDevice?.user?.nick_name ?? '',
      id: filteredDevice?.device_id ?? '',
      name: filteredDevice?.name ?? '',
    };
  }
}
