import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindSchedulingByIdService } from './find-scheduling-by-id.service';
import {
  ErrorMessageResult,
  findSchedulingByIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('find-scheduling-by-id')
export class FindSchedulingByIdController {
  constructor(
    private readonly findSchedulingByIdService: FindSchedulingByIdService
  ) {}

  @UsePipes(new ZodValidationPipe(findSchedulingByIdSchema))
  @Get(':id')
  async find(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findSchedulingByIdService.find({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
