import { Inject } from '@nestjs/common';
import { Device, FindDeviceByIdRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindDeviceByIdRepositoryImpl implements FindDeviceByIdRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<Device> {
    const filteredDevice =
      await this.prismaService.generalPrisma.device.findFirst({
        where: {
          device_id: id,
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

    const mappedDevice: Device = {
      createdAt: filteredDevice?.created_at ?? new Date(),
      createdBy: filteredDevice?.user?.nick_name ?? '',
      id: filteredDevice?.device_id ?? '',
      name: filteredDevice?.name ?? '',
    };

    return mappedDevice;
  }
}
