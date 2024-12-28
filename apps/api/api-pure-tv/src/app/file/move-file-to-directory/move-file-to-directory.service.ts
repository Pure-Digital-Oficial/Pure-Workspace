import { Injectable } from '@nestjs/common';
import {
  MoveFileToDirectory,
  MoveFileToDirectoryDto,
} from '@pure-workspace/domain';

@Injectable()
export class MoveFileToDirectoryService {
  constructor(private useCase: MoveFileToDirectory) {}

  async move(input: MoveFileToDirectoryDto) {
    return await this.useCase.execute(input);
  }
}
