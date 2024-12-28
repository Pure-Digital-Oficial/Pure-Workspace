import { Inject } from '@nestjs/common';
import {
  FormatDateInTime,
  ListSchedulesDto,
  ListSchedulesReponseDto,
  ListSchedulesRepository,
  Scheduling,
  SchedulingPrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ListSchedulesRepositoryImpl implements ListSchedulesRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async list(input: ListSchedulesDto): Promise<ListSchedulesReponseDto> {
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

    const [scheduling, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.scheduling.findMany({
          where: whereClause,
          select: {
            scheduling_id: true,
            created_at: true,
            name: true,
            start_time: true,
            end_time: true,
            looping: true,
            priority: true,
            user: {
              select: {
                nick_name: true,
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.scheduling.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.scheduling.count({
          where: {
            user_id: loggedUserId,
            company_id: companyId,
          },
        }),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedScheduling: Scheduling[] = scheduling.map(
      (scheduling: SchedulingPrismaDto) => {
        return {
          id: scheduling.scheduling_id,
          createBy: scheduling.user.nick_name,
          createdAt: scheduling.created_at,
          endTime: FormatDateInTime(scheduling.end_time),
          lopping: scheduling.looping,
          name: scheduling.name,
          priority: `${scheduling.priority}`,
          startTime: FormatDateInTime(scheduling.start_time),
        };
      }
    );

    return {
      schedules: mappedScheduling,
      filteredTotal,
      total,
      totalPages,
    };
  }
}
