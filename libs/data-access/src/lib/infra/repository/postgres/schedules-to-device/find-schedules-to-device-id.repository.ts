import { Inject } from '@nestjs/common';
import {
  FindSchedulesByDeviceIdDto,
  FindSchedulesByDeviceIdRepository,
  FormatDateInTime,
  SchedulesToDevicePrismaDto,
  Scheduling,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindSchedulesByDeviceIdRepositoryImpl
  implements FindSchedulesByDeviceIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindSchedulesByDeviceIdDto): Promise<Scheduling[]> {
    const filteredSchedules =
      await this.prismaService.generalPrisma.scheduling_X_Device.findMany({
        where: {
          device_id: input.idDevice,
        },
        select: {
          scheduling: {
            select: {
              scheduling_id: true,
              name: true,
              looping: true,
              start_time: true,
              end_time: true,
              created_at: true,
              priority: true,
              user: {
                select: {
                  nick_name: true,
                },
              },
            },
          },
        },
      });

    const mappedSchedules: Scheduling[] = filteredSchedules.map(
      (item: SchedulesToDevicePrismaDto) => {
        return {
          id: item.scheduling?.scheduling_id ?? '',
          name: item.scheduling?.name ?? '',
          endTime: FormatDateInTime(new Date(item.scheduling?.end_time ?? '')),
          startTime: FormatDateInTime(
            new Date(item.scheduling?.start_time ?? '')
          ),
          lopping: item.scheduling?.looping ?? false,
          priority: item.scheduling?.priority.toString() ?? '',
          createBy: item.scheduling?.user?.nick_name ?? '',
          createdAt: item.scheduling?.created_at ?? new Date(),
        };
      }
    );

    return mappedSchedules;
  }
}
