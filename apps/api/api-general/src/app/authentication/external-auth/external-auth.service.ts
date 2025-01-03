import { Injectable } from '@nestjs/common';
import { ExternalAuth, ExternalAuthDto } from '@pure-workspace/domain';

@Injectable()
export class ExternalAuthService {
  constructor(private useCase: ExternalAuth) {}

  async auth(externalAuthDto: ExternalAuthDto) {
    return await this.useCase.execute(externalAuthDto);
  }
}
