import { Injectable } from '@nestjs/common';
import {
  ListSimpleCountry,
  ListSimpleCountryDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListSimpleCountryService {
  constructor(private useCase: ListSimpleCountry) {}

  async list(input: ListSimpleCountryDto) {
    return await this.useCase.execute(input);
  }
}
