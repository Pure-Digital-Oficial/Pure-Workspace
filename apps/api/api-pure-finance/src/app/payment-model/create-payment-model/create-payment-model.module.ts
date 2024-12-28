import { Module } from '@nestjs/common';

import { CreatePaymentModelController } from './create-payment-model.controller';
import {
  CreatePaymentModelRepositoryImpl,
  FindPaymentModelByNameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  VerifyUserPermissionsByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreatePaymentModelService } from './create-payment-model.service';
import { CreatePaymentModel } from '@pure-workspace/domain';

@Module({
  imports: [],
  controllers: [CreatePaymentModelController],
  providers: [
    CreatePaymentModel,
    CreatePaymentModelService,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindPaymentModelByNameRepository',
      useClass: FindPaymentModelByNameRepositoryImpl,
    },
    {
      provide: 'VerifyUserPermissionsByIdRepository',
      useClass: VerifyUserPermissionsByIdRepositoryImpl,
    },
    {
      provide: 'CreatePaymentModelRepository',
      useClass: CreatePaymentModelRepositoryImpl,
    },
  ],
})
export class CreatePaymentModelModule {}
