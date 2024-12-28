import { Inject } from '@nestjs/common';
import {
  CreateSchedulingDto,
  CreateSchedulingRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class CreateSchedulingRepositoryImpl
  implements CreateSchedulingRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateSchedulingDto): Promise<string> {
    const {
      loggedUserId,
      companyId,
      body: { name, priority, startTime, endTime, lopping },
    } = input;

    const schedulingResult =
      await this.prismaService.generalPrisma.scheduling.create({
        data: {
          user_id: loggedUserId,
          company_id: companyId,
          name,
          start_time: startTime,
          end_time: endTime,
          looping: lopping,
          priority: parseInt(priority),
        },
      });

    return schedulingResult.scheduling_id;
  }
}
