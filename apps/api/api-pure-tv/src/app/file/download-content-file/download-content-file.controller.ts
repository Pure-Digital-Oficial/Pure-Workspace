import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { DownloadContentFileService } from './download-content-file.service';
import {
  DownloadContentFileDto,
  downloadContentFileSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('download-content-file')
export class DownloadContentFileController {
  constructor(
    private readonly downloadContentFileService: DownloadContentFileService
  ) {}

  @UsePipes(new ZodValidationPipe(downloadContentFileSchema))
  @Get(':id')
  async download(
    @Param('id') idToDownload: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('directoryId') directoryId: string
  ) {
    const dto: DownloadContentFileDto = {
      directoryId,
      idToDownload,
      loggedUserId,
    };

    const result = await this.downloadContentFileService.download(dto);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
