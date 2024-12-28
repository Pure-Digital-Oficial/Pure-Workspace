import { Inject } from '@nestjs/common';
import {
  EditSchedulingDto,
  EditSchedulingRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class EditSchedulingRepositoryImpl implements EditSchedulingRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditSchedulingDto): Promise<string> {
    const editedScheduling =
      await this.prismaService.generalPrisma.scheduling.update({
        where: {
          scheduling_id: input.id,
        },
        data: {
          end_time: input.body.endTime,
          looping: input.body.lopping,
          name: input.body.name,
          start_time: input.body.startTime,
          updated_at: new Date(),
          priority: parseInt(input.body.priority),
        },
      });

    return editedScheduling?.scheduling_id ?? '';
  }
}
