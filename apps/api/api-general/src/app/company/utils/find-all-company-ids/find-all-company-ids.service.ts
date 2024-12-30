import { Injectable } from '@nestjs/common';
import {
  FindAllCompanyIds,
  FindAllCompanyIdsDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindAllCompanyIdsService {
  constructor(private useCase: FindAllCompanyIds) {}

  async find(input: FindAllCompanyIdsDto) {
    return await this.useCase.execute(input);
  }
}
