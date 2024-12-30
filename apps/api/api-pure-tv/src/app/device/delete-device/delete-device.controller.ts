import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeleteDeviceService } from './delete-device.service';
import {
  deleteDeviceByIdSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-device')
export class DeleteDeviceController {
  constructor(private readonly deleteDeviceService: DeleteDeviceService) {}

  @UsePipes(new ZodValidationPipe(deleteDeviceByIdSchema))
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deleteDeviceService.delete({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
