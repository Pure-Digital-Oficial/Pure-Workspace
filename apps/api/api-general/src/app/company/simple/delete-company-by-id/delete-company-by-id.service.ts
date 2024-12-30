import { Injectable } from '@nestjs/common';
import {
  DeleteCompanyById,
  DeleteCompanyByIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeleteCompanyByIdService {
  constructor(private useCase: DeleteCompanyById) {}

  async delete(input: DeleteCompanyByIdDto) {
    return await this.useCase.execute(input);
  }
}
