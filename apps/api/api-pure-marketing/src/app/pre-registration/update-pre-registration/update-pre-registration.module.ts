import { Module } from '@nestjs/common';
import { UpdatePreRegistration } from '@pure-workspace/domain';
import {
  FindPreRegistrationByIdRepositoryImpl,
  PrismaMarketingService,
  UpdatePreRegistrationRepositoryImpl,
} from '@pure-workspace/data-access';
import { UpdatePreRegistrationService } from './update-pre-registration.service';
import { UpdatePreRegistrationController } from './update-pre-registration.controller';

@Module({
  controllers: [UpdatePreRegistrationController],
  providers: [
    UpdatePreRegistrationService,
    UpdatePreRegistration,
    {
      provide: 'PrismaService',
      useClass: PrismaMarketingService,
    },
    {
      provide: 'FindPreRegistrationByIdRepository',
      useClass: FindPreRegistrationByIdRepositoryImpl,
    },
    {
      provide: 'UpdatePreRegistrationRepository',
      useClass: UpdatePreRegistrationRepositoryImpl,
    },
  ],
})
export class UpdatePreRegistrationModule {}
