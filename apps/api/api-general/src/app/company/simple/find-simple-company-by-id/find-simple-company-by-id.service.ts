import { Injectable } from '@nestjs/common';
import {
  FindSimpleCompanyById,
  FindSimpleCompanyByIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class FindSimpleCompanyByIdService {
  constructor(private useCase: FindSimpleCompanyById) {}

  async find(input: FindSimpleCompanyByIdDto) {
    return this.useCase.execute(input);
  }
}
