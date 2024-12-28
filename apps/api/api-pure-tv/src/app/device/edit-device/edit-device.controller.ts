import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditDeviceService } from './edit-device.service';
import { editDeviceSchema, ErrorMessageResult } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-device')
export class EditDeviceController {
  constructor(private readonly editDeviceService: EditDeviceService) {}

  @UsePipes(new ZodValidationPipe(editDeviceSchema))
  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { name: string }
  ) {
    const result = await this.editDeviceService.edit({
      id,
      loggedUserId,
      name: body?.name ?? '',
    });

    if (result.isRight()) return { deviceId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
