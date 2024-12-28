import { Injectable } from '@nestjs/common';
import {
  DeletePlaylistFiles,
  DeletePlaylistFilesDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeletePlaylistFilesService {
  constructor(private useCase: DeletePlaylistFiles) {}

  async delete(input: DeletePlaylistFilesDto) {
    return await this.useCase.execute(input);
  }
}
