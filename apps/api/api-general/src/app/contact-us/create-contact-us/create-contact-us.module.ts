import { Module } from '@nestjs/common';
import { CreateContactUsService } from './create-contact-us.service';
import { CreateContactUsController } from './create-contact-us.controller';
import { CreateContactUs } from '@pure-workspace/domain';
import {
  CreateContactUsRepositoryImpl,
  FindAppByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateContactUsController],
  providers: [
    CreateContactUsService,
    CreateContactUs,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
    },
    {
      provide: 'CreateContactUsRepository',
      useClass: CreateContactUsRepositoryImpl,
    },
  ],
})
export class CreateContactUsModule {}
