import { Injectable } from '@nestjs/common';
import {
  FindFilesByPlaylist,
  FindFilesByPlaylistDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindFilesByPlaylistService {
  constructor(private useCase: FindFilesByPlaylist) {}

  async find(input: FindFilesByPlaylistDto) {
    return this.useCase.execute(input);
  }
}
