import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListDeviceService } from './list-device.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { ErrorMessageResult, listDeviceSchema } from '@pure-workspace/domain';

@Controller('list-device')
export class ListDeviceController {
  constructor(private readonly listDeviceService: ListDeviceService) {}

  @UsePipes(new ZodValidationPipe(listDeviceSchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.listDeviceService.list({
      loggedUserId,
      companyId,
      filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
