import { Injectable } from '@nestjs/common';
import { ValidateToken, ValidateTokenDto } from '@pure-workspace/domain';

@Injectable()
export class ValidateTokenService {
  constructor(private useCase: ValidateToken) {}

  async validate(validateTokenDto: ValidateTokenDto) {
    return await this.useCase.execute(validateTokenDto);
  }
}
