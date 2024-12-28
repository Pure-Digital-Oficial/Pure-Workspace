import { Body, Controller, Put, Query, UsePipes } from '@nestjs/common';
import { MoveSchedulesToAnotherDeviceService } from './move-schedules-to-another-device.service';
import {
  ErrorMessageResult,
  moveSchedulesToAnotherDeviceSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('move-schedules-to-another-device')
export class MoveSchedulesToAnotherDeviceController {
  constructor(
    private readonly moveSchedulesToAnotherDeviceService: MoveSchedulesToAnotherDeviceService
  ) {}

  @UsePipes(new ZodValidationPipe(moveSchedulesToAnotherDeviceSchema))
  @Put()
  async move(
    @Query('oldDeviceId') oldDeviceId: string,
    @Query('newDeviceId') newDeviceId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { schedulesIds: string[] }
  ) {
    const result = await this.moveSchedulesToAnotherDeviceService.move({
      oldDeviceId,
      newDeviceId,
      loggedUserId,
      schedulesIds: body.schedulesIds ?? [],
    });

    if (result.isRight()) return { ids: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
