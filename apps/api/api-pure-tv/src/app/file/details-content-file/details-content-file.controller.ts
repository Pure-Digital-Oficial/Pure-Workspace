import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { DetailsContentFileService } from './details-content-file.service';
import {
  DetailsContentFileDto,
  detailsContentFileSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('details-content-file')
export class DetailsContentFileController {
  constructor(
    private readonly detailsContentFileService: DetailsContentFileService
  ) {}

  @UsePipes(new ZodValidationPipe(detailsContentFileSchema))
  @Get(':id')
  async details(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('directoryId') directoryId: string
  ) {
    const dto: DetailsContentFileDto = {
      directoryId,
      loggedUserId,
      id,
    };

    const result = await this.detailsContentFileService.details(dto);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
