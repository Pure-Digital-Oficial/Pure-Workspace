import { Injectable } from '@nestjs/common';
import { DetailsPlaylist, DetailsPlaylistDto } from '@pure-workspace/domain';

@Injectable()
export class DetailsPlaylistService {
  constructor(private useCase: DetailsPlaylist) {}

  async details(input: DetailsPlaylistDto) {
    return await this.useCase.execute(input);
  }
}
