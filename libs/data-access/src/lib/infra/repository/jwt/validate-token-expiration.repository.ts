import { ValidateTokenExpirationRepository } from '@pure-workspace/domain';
import * as jwt from 'jsonwebtoken';

export class ValidateTokenExpirationRepositoryImpl
  implements ValidateTokenExpirationRepository
{
  private readonly secretKey = process.env['JWT_SECRET'] || '';
  async validate(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}
