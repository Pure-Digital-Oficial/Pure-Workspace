import {
  Body,
  Controller,
  Delete,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';
import { DeleteSchedulesToDeviceService } from './delete-schedules-to-device.service';
import {
  deleteSchedulesToDeviceSchema,
  deleteSchedulingSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-schedules-to-device')
export class DeleteSchedulesToDeviceController {
  constructor(
    private readonly deleteSchedulesToDeviceService: DeleteSchedulesToDeviceService
  ) {}

  @UsePipes(new ZodValidationPipe(deleteSchedulesToDeviceSchema))
  @Delete(':id')
  async delete(
    @Param('id') idDevice: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { schedulesIds: string[] }
  ) {
    const result = await this.deleteSchedulesToDeviceService.delete({
      idDevice,
      loggedUserId,
      schedulesIds: body.schedulesIds ?? [],
    });

    if (result.isRight()) return { ids: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
