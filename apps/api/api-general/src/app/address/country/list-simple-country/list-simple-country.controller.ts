import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListSimpleCountryService } from './list-simple-country.service';
import {
  ErrorMessageResult,
  listSimpleCountrySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('list-simple-country')
export class ListSimpleCountryController {
  constructor(
    private readonly listSimpleCountryService: ListSimpleCountryService
  ) {}

  @Get()
  @UsePipes(new ZodValidationPipe(listSimpleCountrySchema))
  async list(@Query('loggedUserId') loggedUserId: string) {
    const result = await this.listSimpleCountryService.list({ loggedUserId });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
