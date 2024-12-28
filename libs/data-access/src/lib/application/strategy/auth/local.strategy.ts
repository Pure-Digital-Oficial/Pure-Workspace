import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ValidateUser } from '@pure-workspace/domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private useCase: ValidateUser) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.useCase.execute({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
