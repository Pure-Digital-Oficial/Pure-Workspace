import { SignInDto } from '../../dto';
import { AccessToken } from '../../entity';

export interface SignInRepository {
  sign(input: SignInDto): Promise<AccessToken>;
}
