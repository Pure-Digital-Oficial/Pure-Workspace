import { Module } from '@nestjs/common';
import { ExternalAuth, ValidateUser } from '@pure-workspace/domain';
import {
  CreateUserRepositoryImpl,
  FilterByEmailOrNicknameRepositoryImpl,
  FindAppByIdRepositoryImpl,
  JwtStrategy,
  LocalAuthGuard,
  LocalStrategy,
  PrismaGeneralService,
  SignInRepositoryImpl,
  ValidateHashRepositoryImpl,
} from '@pure-workspace/data-access';
import { ExternalAuthController } from './external-auth.controller';
import { ExternalAuthService } from './external-auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ExternalAuthController],
  providers: [
    ExternalAuth,
    ExternalAuthService,
    ValidateUser,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'ValidateHashRepository',
      useClass: ValidateHashRepositoryImpl,
    },
    {
      provide: 'JwtService',
      useClass: JwtService,
    },
    {
      provide: 'FilterByEmailOrNicknameRepository',
      useClass: FilterByEmailOrNicknameRepositoryImpl,
    },
    {
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
    },
    {
      provide: 'CreateUserRepository',
      useClass: CreateUserRepositoryImpl,
    },
    {
      provide: 'SignInRepository',
      useClass: SignInRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class ExternalAuthModule {}
