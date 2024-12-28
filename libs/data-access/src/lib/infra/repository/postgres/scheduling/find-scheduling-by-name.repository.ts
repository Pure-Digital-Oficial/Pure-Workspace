import { Inject } from '@nestjs/common';
import {
  FindSchedulingByNameDto,
  FindSchedulingByNameRepository,
  Scheduling,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindSchedulingByNameRepositoryImpl
  implements FindSchedulingByNameRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindSchedulingByNameDto): Promise<Scheduling> {
    const filteredScheduling =
      await this.prismaService.generalPrisma.scheduling.findFirst({
        where: {
          name: input.name,
          user_id: input.loggedUserId,
        },
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
      });

    const mappedScheduling: Scheduling = {
      id: filteredScheduling?.scheduling_id ?? '',
      name: filteredScheduling?.name ?? '',
      endTime: filteredScheduling?.end_time.toISOString() ?? '',
      startTime: filteredScheduling?.start_time.toISOString() ?? '',
      lopping: filteredScheduling?.looping ?? false,
      priority: filteredScheduling?.priority.toString() ?? '',
      createBy: filteredScheduling?.user?.nick_name ?? '',
      createdAt: filteredScheduling?.created_at ?? new Date(),
    };

    return mappedScheduling;
  }
}
