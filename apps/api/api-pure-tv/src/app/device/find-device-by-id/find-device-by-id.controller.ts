import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindDeviceByIdService } from './find-device-by-id.service';
import { ErrorMessageResult, findDeviceByIdSchema } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('find-device-by-id')
export class FindDeviceByIdController {
  constructor(private readonly findDeviceByIdService: FindDeviceByIdService) {}

  @UsePipes(new ZodValidationPipe(findDeviceByIdSchema))
  @Get(':id')
  async find(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findDeviceByIdService.find({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
