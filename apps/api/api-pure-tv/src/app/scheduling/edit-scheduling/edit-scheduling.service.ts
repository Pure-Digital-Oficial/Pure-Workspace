import { Injectable } from '@nestjs/common';
import { EditScheduling, EditSchedulingDto } from '@pure-workspace/domain';

@Injectable()
export class EditSchedulingService {
  constructor(private useCase: EditScheduling) {}

  async edit(input: EditSchedulingDto) {
    return await this.useCase.execute(input);
  }
}
