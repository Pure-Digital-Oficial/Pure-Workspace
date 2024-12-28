import { Module } from '@nestjs/common';
import {
  ChangeProductStatusRepositoryImpl,
  FindProductByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  VerifyUserPermissionsByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { ChangeProductStatus } from '@pure-workspace/domain';
import { ChangeProductStatusController } from './change-product-status.controller';
import { ChangeProductStatusService } from './change-product-status.service';

@Module({
  imports: [],
  controllers: [ChangeProductStatusController],
  providers: [
    ChangeProductStatus,
    ChangeProductStatusService,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindProductByIdRepository',
      useClass: FindProductByIdRepositoryImpl,
    },
    {
      provide: 'VerifyUserPermissionsByIdRepository',
      useClass: VerifyUserPermissionsByIdRepositoryImpl,
    },
    {
      provide: 'ChangeProductStatusRepository',
      useClass: ChangeProductStatusRepositoryImpl,
    },
  ],
})
export class ChangeProductStatusModule {}
