import { ValidateTokenExpirationRepository } from '../../../src';

export class ValidateTokenExpirationRepositoryMock
  implements ValidateTokenExpirationRepository
{
  inputMock = '';
  async validate(token: string): Promise<boolean> {
    this.inputMock = token;
    return true;
  }
}
