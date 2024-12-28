import { Module } from '@nestjs/common';
import { CreateAuthService } from './create-auth.service';
import { CreateAuthController } from './create-auth.controller';
import { CreateAuth } from '@pure-workspace/domain';
import {
  CreateAuthRepositoryImpl,
  FilterByEmailOrNicknameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  HashGeneratorImpl,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateAuthController],
  providers: [
    CreateAuthService,
    CreateAuth,
    {
      provide: 'FilterByEmailOrNicknameRepository',
      useClass: FilterByEmailOrNicknameRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'CreateAuthRepository',
      useClass: CreateAuthRepositoryImpl,
    },
    {
      provide: 'HashGeneratorRepository',
      useClass: HashGeneratorImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateAuthModule {}
