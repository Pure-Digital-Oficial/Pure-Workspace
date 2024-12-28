import { Injectable } from '@nestjs/common';
import { AddFileToPlaylist, AddFileToPlaylistDto } from '@pure-workspace/domain';

@Injectable()
export class AddFileToPlaylistService {
  constructor(private useCase: AddFileToPlaylist) {}

  async add(input: AddFileToPlaylistDto) {
    return await this.useCase.execute(input);
  }
}
