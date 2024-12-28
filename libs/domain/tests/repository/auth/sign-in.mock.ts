import { AccessToken, SignInDto, SignInRepository } from '../../../src';
import { AccessTokenMock } from '../../entity/auth/access-token.mock';

export class SignInRepositoryMock implements SignInRepository {
  inputMock = {} as SignInDto;
  async sign(input: SignInDto): Promise<AccessToken> {
    this.inputMock = input;
    return AccessTokenMock;
  }
}
