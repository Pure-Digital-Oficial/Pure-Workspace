import { Module } from '@nestjs/common';
import { FindUserByEmailService } from './find-user-by-email.service';
import { FindUserByEmailController } from './find-user-by-email.controller';
import {
  FindUserByEmailRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { FindUserByEmail } from '@pure-workspace/domain';

@Module({
  controllers: [FindUserByEmailController],
  providers: [
    FindUserByEmailService,
    FindUserByEmail,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByEmailRepository',
      useClass: FindUserByEmailRepositoryImpl,
    },
  ],
})
export class FindUserByEmailModule {}
