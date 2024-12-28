import { Module } from '@nestjs/common';
import { AdmLoginService } from './adm-login.service';
import { AdmLoginController } from './adm-login.controller';
import { AdmLogin, ValidateUser } from '@pure-workspace/domain';
import {
  FilterByEmailOrNicknameRepositoryImpl,
  SignInRepositoryImpl,
  LocalAuthGuard,
  LocalStrategy,
  JwtStrategy,
  ValidateHashRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '2m' },
    }),
  ],
  controllers: [AdmLoginController],
  providers: [
    AdmLoginService,
    ValidateUser,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    AdmLogin,
    {
      provide: 'SignInRepository',
      useClass: SignInRepositoryImpl,
    },
    {
      provide: 'ValidateHashRepository',
      useClass: ValidateHashRepositoryImpl,
    },
    {
      provide: 'FilterByEmailOrNicknameRepository',
      useClass: FilterByEmailOrNicknameRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'JwtService',
      useClass: JwtService,
    },
  ],
})
export class AdmLoginModule {}
