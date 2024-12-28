import { Injectable } from '@nestjs/common';
import { DeleteDirectory, DeleteDirectoryDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteDirectoryService {
  constructor(private useCase: DeleteDirectory) {}

  async delete(input: DeleteDirectoryDto) {
    return await this.useCase.execute(input);
  }
}
