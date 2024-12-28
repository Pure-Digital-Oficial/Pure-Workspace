import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListCompanyService } from './list-company.service';
import { ErrorMessageResult, lisCompanySchema } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('list-company')
export class ListCompanyController {
  constructor(private readonly listCompanyService: ListCompanyService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(lisCompanySchema))
  async list(
    @Query('filter') filter: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('take') take: string,
    @Query('skip') skip: string
  ) {
    const result = await this.listCompanyService.list({
      filter: filter ?? '',
      loggedUserId: loggedUserId ?? '',
      take: parseInt(take),
      skip: parseInt(skip),
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
