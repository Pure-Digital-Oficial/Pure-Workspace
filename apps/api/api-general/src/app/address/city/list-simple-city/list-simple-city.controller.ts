import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListSimpleCityService } from './list-simple-city.service';
import { ErrorMessageResult, listSimpleCitySchema } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('list-simple-city')
export class ListSimpleCityController {
  constructor(private readonly listSimpleCityService: ListSimpleCityService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(listSimpleCitySchema))
  async list(
    @Query('loggedUserId') loggedUserId: string,
    @Query('stateId') stateId: string
  ) {
    const result = await this.listSimpleCityService.list({
      loggedUserId,
      stateId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
