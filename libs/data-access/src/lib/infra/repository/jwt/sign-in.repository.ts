import {
  AccessToken,
  SignInDto,
  SignInRepository,
} from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';

export class SignInRepositoryImpl implements SignInRepository {
  constructor(@Inject('JwtService') private jwtService: JwtService) {}

  async sign(input: SignInDto): Promise<AccessToken> {
    const payload = { email: input.email, sub: input.userId };
    const result = this.jwtService.sign(payload, {
      secret: `${process.env['JWT_SECRET']}`,
      expiresIn: '6h',
    });
    return { token: result };
  }
}
