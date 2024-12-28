import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import {
  CreateUserRepositoryImpl,
  FilterByEmailOrNicknameRepositoryImpl,
  FindAppByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { CreateUser } from '@pure-workspace/domain';

@Module({
  controllers: [CreateUserController],
  providers: [
    CreateUser,
    CreateUserService,
    {
      provide: 'CreateUserRepository',
      useClass: CreateUserRepositoryImpl,
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
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateUserModule {}
