import { Injectable } from '@nestjs/common';
import { EditDirectory, EditDirectoryDto } from '@pure-workspace/domain';

@Injectable()
export class EditDirectoryService {
  constructor(private useCase: EditDirectory) {}

  async edit(input: EditDirectoryDto) {
    return await this.useCase.execute(input);
  }
}
