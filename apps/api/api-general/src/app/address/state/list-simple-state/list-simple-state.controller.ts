import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListSimpleStateService } from './list-simple-state.service';
import {
  ErrorMessageResult,
  listSimpleStateSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('list-simple-state')
export class ListSimpleStateController {
  constructor(
    private readonly listSimpleStateService: ListSimpleStateService
  ) {}

  @Get()
  @UsePipes(new ZodValidationPipe(listSimpleStateSchema))
  async list(
    @Query('countryId') countryId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.listSimpleStateService.list({
      countryId,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
