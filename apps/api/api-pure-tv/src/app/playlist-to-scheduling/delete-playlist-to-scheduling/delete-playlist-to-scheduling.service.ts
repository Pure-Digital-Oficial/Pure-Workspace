import { Injectable } from '@nestjs/common';
import {
  DeletePlaylistToScheduling,
  DeletePlaylistToSchedulingDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeletePlaylistToSchedulingService {
  constructor(private useCase: DeletePlaylistToScheduling) {}

  async delete(input: DeletePlaylistToSchedulingDto) {
    return await this.useCase.execute(input);
  }
}
