import { Injectable } from '@nestjs/common';
import { EditPlaylist, EditPlaylistDto } from '@pure-workspace/domain';

@Injectable()
export class EditPlaylistService {
  constructor(private useCase: EditPlaylist) {}

  async edit(input: EditPlaylistDto) {
    return await this.useCase.execute(input);
  }
}
