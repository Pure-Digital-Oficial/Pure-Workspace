import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindSchedulesByDeviceIdService } from './find-schedules-by-device-id.service';
import {
  ErrorMessageResult,
  findSchedulesByDeviceIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('find-schedules-by-device-id')
export class FindSchedulesByDeviceIdController {
  constructor(
    private readonly findSchedulesByDeviceIdService: FindSchedulesByDeviceIdService
  ) {}

  @UsePipes(new ZodValidationPipe(findSchedulesByDeviceIdSchema))
  @Get(':id')
  async find(
    @Param('id') idDevice: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findSchedulesByDeviceIdService.find({
      idDevice,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
