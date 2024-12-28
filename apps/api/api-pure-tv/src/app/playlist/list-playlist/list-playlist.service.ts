import { Injectable } from '@nestjs/common';
import { ListPlaylist, ListPlaylistDto } from '@pure-workspace/domain';

@Injectable()
export class ListPlaylistService {
  constructor(private useCase: ListPlaylist) {}

  async list(input: ListPlaylistDto) {
    return await this.useCase.execute(input);
  }
}
