import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateSchedulingService } from './create-scheduling.service';
import {
  CreateSchedulingBodyDto,
  CreateSchedulingResponseDto,
  createSchedulingSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-scheduling')
export class CreateSchedulingController {
  constructor(
    private readonly createSchedulingService: CreateSchedulingService
  ) {}

  @UsePipes(new ZodValidationPipe(createSchedulingSchema))
  @Post()
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string,
    @Body() body: CreateSchedulingBodyDto
  ) {
    const result = await this.createSchedulingService.create({
      body: {
        endTime: body?.endTime ?? '',
        startTime: body?.startTime ?? '',
        lopping: body?.lopping ?? false,
        name: body?.name ?? '',
        priority: body?.priority ?? 0,
      },
      loggedUserId,
      companyId,
    });

    const response: CreateSchedulingResponseDto = {
      schedulingId: `${result.value}`,
    };

    if (result.isRight()) return response;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
