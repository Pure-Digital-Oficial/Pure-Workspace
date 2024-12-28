import { Inject } from '@nestjs/common';
import {
  Device,
  DevicePrismaDto,
  ListDeviceDto,
  ListDeviceRepository,
  ListDeviceResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ListDeviceRepositoryImpl implements ListDeviceRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListDeviceDto): Promise<ListDeviceResponseDto> {
    const { loggedUserId, companyId, filter } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      user_id: loggedUserId,
      company_id: companyId,
      ...(filter !== ''
        ? {
            name: {
              contains: filter,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };

    const [devices, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.device.findMany({
          where: whereClause,
          select: {
            device_id: true,
            created_at: true,
            name: true,
            user: {
              select: {
                nick_name: true,
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.device.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.device.count({
          where: {
            user_id: loggedUserId,
            company_id: companyId,
          },
        }),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedDevices: Device[] = devices.map((device: DevicePrismaDto) => ({
      createdAt: device.created_at ?? new Date(),
      createdBy: device.user?.nick_name ?? '',
      id: device.device_id ?? '',
      name: device.name ?? '',
    }));

    return {
      devices: mappedDevices,
      filteredTotal,
      total,
      totalPages,
    };
  }
}
