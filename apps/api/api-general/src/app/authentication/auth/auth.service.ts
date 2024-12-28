/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Login, LoginDto } from '@pure-workspace/domain';

@Injectable()
export class AuthService {
  constructor(private useCase: Login) {}

  async login(user: any) {
    let error = `${user.value}`;

    const loginDto: LoginDto = {
      email: (user.value.email =
        user.value.email == undefined ? '' : user.value.email),
      error: (error = error == '[object Object]' ? '' : error),
    };
    return await this.useCase.execute(loginDto);
  }
}
