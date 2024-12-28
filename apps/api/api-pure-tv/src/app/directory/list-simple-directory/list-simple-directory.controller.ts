import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListSimpleDirectoryService } from './list-simple-directory.service';
import {
  ErrorMessageResult,
  listSimpleDirectorySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-simple-directory')
export class ListSimpleDirectoryController {
  constructor(
    private readonly listSimpleDirectoryService: ListSimpleDirectoryService
  ) {}

  @UsePipes(new ZodValidationPipe(listSimpleDirectorySchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.listSimpleDirectoryService.list({
      loggedUserId,
      companyId,
      userInput: filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
