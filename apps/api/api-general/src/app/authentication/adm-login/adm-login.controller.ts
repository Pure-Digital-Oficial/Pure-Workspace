import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AdmLoginService } from './adm-login.service';
import { LocalAuthGuard } from '@pure-workspace/data-access';
import { AdmRequestDto, ErrorMessageResult } from '@pure-workspace/domain';

@Controller('auth')
export class AdmLoginController {
  constructor(private readonly authService: AdmLoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post('adm-login')
  async login(@Request() input: AdmRequestDto) {
    const result = await this.authService.login(input.user);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
