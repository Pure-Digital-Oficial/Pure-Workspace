import { Injectable } from '@nestjs/common';
import {
  ListPlaylistBySchedulingId,
  ListPlaylistBySchedulingIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListPlaylistBySchedulingIdService {
  constructor(private useCase: ListPlaylistBySchedulingId) {}

  async list(input: ListPlaylistBySchedulingIdDto) {
    return await this.useCase.execute(input);
  }
}
