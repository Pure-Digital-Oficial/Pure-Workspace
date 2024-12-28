import { Injectable } from '@nestjs/common';
import { FindPlaylistById, FindPlaylistByIdDto } from '@pure-workspace/domain';

@Injectable()
export class FindPlaylistByIdService {
  constructor(private useCase: FindPlaylistById) {}

  async find(input: FindPlaylistByIdDto) {
    return await this.useCase.execute(input);
  }
}
