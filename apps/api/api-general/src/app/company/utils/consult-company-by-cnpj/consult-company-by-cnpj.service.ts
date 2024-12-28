import { Injectable } from '@nestjs/common';
import {
  ConsultCompanyBrDto,
  ConsultCompanyByCnpj,
  ConsultCompanyByCnpjDto,
} from '@pure-workspace/domain';

@Injectable()
export class ConsultCompanyByCnpjService {
  constructor(private useCase: ConsultCompanyByCnpj) {}

  async consult(input: ConsultCompanyByCnpjDto) {
    return await this.useCase.execute(input);
  }
}
