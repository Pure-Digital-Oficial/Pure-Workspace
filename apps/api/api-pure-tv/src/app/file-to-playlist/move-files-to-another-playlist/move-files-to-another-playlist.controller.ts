import { Body, Controller, Put, Query } from '@nestjs/common';
import { MoveFilesToAnotherPlaylistService } from './move-files-to-another-playlist.service';
import { ErrorMessageResult } from '@pure-workspace/domain';

@Controller('move-files-to-another-playlist')
export class MoveFilesToAnotherPlaylistController {
  constructor(
    private readonly moveFilesToAnotherPlaylistService: MoveFilesToAnotherPlaylistService
  ) {}

  @Put()
  async move(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { filesId: string[] },
    @Query('oldPlaylistId') oldPlaylistId: string,
    @Query('newPlaylistId') newPlaylistId: string
  ) {
    const result = await this.moveFilesToAnotherPlaylistService.move({
      filesId: body.filesId,
      loggedUserId,
      oldPlaylistId,
      newPlaylistId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
