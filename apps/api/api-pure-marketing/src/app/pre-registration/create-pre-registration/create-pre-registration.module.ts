import { Module } from '@nestjs/common';
import { CreatePreRegistrationService } from './create-pre-registration.service';
import { CreatePreRegistrationController } from './create-pre-registration.controller';
import { CreatePreRegistration } from '@pure-workspace/domain';
import {
  CreatePreRegistrationRepostioryImpl,
  FindPreRegistrationBySendingIdRepositoryImpl,
  FindSendingByIdRepositoryImpl,
  PrismaMarketingService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreatePreRegistrationController],
  providers: [
    CreatePreRegistrationService,
    CreatePreRegistration,
    {
      provide: 'PrismaService',
      useClass: PrismaMarketingService,
    },
    {
      provide: 'FindSendingByIdRepository',
      useClass: FindSendingByIdRepositoryImpl,
    },
    {
      provide: 'FindPreRegistrationBySendingIdRepository',
      useClass: FindPreRegistrationBySendingIdRepositoryImpl,
    },
    {
      provide: 'CreatePreRegistrationRepository',
      useClass: CreatePreRegistrationRepostioryImpl,
    },
  ],
})
export class CreatePreRegistrationModule {}
