import { Injectable } from '@nestjs/common';
import {
  FindCompanyAddressById,
  FindCompanyAddressByIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindCompanyAddressByIdService {
  constructor(private useCase: FindCompanyAddressById) {}

  async find(input: FindCompanyAddressByIdDto) {
    return await this.useCase.execute(input);
  }
}
