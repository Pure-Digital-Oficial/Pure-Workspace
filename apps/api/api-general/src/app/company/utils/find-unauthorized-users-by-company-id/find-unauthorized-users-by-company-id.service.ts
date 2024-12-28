import { Injectable } from '@nestjs/common';
import {
  FindUnauthorizedUsersByCompanyId,
  FindUnauthorizedUsersByCompanyIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindUnauthorizedUsersByCompanyIdService {
  constructor(private useCase: FindUnauthorizedUsersByCompanyId) {}

  async find(input: FindUnauthorizedUsersByCompanyIdDto) {
    return await this.useCase.execute(input);
  }
}
