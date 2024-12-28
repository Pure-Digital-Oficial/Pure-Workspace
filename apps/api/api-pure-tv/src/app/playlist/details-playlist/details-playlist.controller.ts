import { Controller, Get, Param, Query } from '@nestjs/common';
import { DetailsPlaylistService } from './details-playlist.service';
import { ErrorMessageResult } from '@pure-workspace/domain';

@Controller('details-playlist')
export class DetailsPlaylistController {
  constructor(
    private readonly detailsPlaylistService: DetailsPlaylistService
  ) {}

  @Get(':id')
  async details(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.detailsPlaylistService.details({
      loggedUserId,
      playlistId: id,
    });

    if (result.isRight()) return result.value;
    else ErrorMessageResult(result.value.name, result.value.message);
  }
}
