import { Injectable } from '@nestjs/common';
import {
  ListUsersByCompanyId,
  ListUsersByCompanyIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListUsersByCompanyIdService {
  constructor(private useCase: ListUsersByCompanyId) {}

  async list(input: ListUsersByCompanyIdDto) {
    return await this.useCase.execute(input);
  }
}
