import { Injectable } from '@nestjs/common';
import { ListSimpleCity, ListSimpleCityDto } from '@pure-workspace/domain';

@Injectable()
export class ListSimpleCityService {
  constructor(private useCase: ListSimpleCity) {}

  async list(input: ListSimpleCityDto) {
    return await this.useCase.execute(input);
  }
}
