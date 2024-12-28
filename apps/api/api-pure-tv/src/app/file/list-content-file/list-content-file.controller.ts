import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListContentFileService } from './list-content-file.service';
import {
  ErrorMessageResult,
  ListContentFileDto,
  listContentFileSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-content-file')
export class ListContentFileController {
  constructor(
    private readonly listContentFileService: ListContentFileService
  ) {}

  @UsePipes(new ZodValidationPipe(listContentFileSchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('directoryId') directoryId: string,
    @Query('companyId') companyId: string
  ) {
    const dto: ListContentFileDto = {
      directoryId,
      loggedUserId,
      companyId,
      userInput: filter,
      skip: skip,
      take: take,
    };

    const result = await this.listContentFileService.list(dto);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
