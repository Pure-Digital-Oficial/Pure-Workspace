import { Injectable } from '@nestjs/common';
import { CreateDirectory, CreateDirectoryDto } from '@pure-workspace/domain';

@Injectable()
export class CreateDirectoryService {
  constructor(private useCase: CreateDirectory) {}

  async create(input: CreateDirectoryDto) {
    return await this.useCase.execute(input);
  }
}
