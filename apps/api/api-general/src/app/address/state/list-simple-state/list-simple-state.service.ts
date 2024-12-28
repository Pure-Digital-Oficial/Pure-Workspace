import { Injectable } from '@nestjs/common';
import { ListSimpleState, ListSimpleStateDto } from '@pure-workspace/domain';

@Injectable()
export class ListSimpleStateService {
  constructor(private useCase: ListSimpleState) {}

  async list(input: ListSimpleStateDto) {
    return await this.useCase.execute(input);
  }
}
