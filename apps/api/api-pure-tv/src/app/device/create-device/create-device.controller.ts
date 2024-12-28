import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateDeviceService } from './create-device.service';
import { createDeviceSchema, ErrorMessageResult } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-device')
export class CreateDeviceController {
  constructor(private readonly createDeviceService: CreateDeviceService) {}

  @UsePipes(new ZodValidationPipe(createDeviceSchema))
  @Post()
  async create(
    @Query('companyId') companyId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { name: string }
  ) {
    const result = await this.createDeviceService.create({
      loggedUserId,
      body: {
        name: body?.name ?? '',
      },
      companyId,
    });

    if (result.isRight()) return { deviceId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
