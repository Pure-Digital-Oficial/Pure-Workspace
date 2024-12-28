import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { AddSchedulesToDeviceService } from './add-schedules-to-device.service';
import {
  addSchedulesToDeviceSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('add-schedules-to-device')
export class AddSchedulesToDeviceController {
  constructor(
    private readonly addSchedulesToDeviceService: AddSchedulesToDeviceService
  ) {}

  @UsePipes(new ZodValidationPipe(addSchedulesToDeviceSchema))
  @Post()
  async add(
    @Query('idDevice') idDevice: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { schedulesIds: string[] }
  ) {
    const result = await this.addSchedulesToDeviceService.add({
      idDevice,
      loggedUserId,
      schedulesIds: body.schedulesIds ?? [],
    });

    if (result.isRight()) return { ids: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
