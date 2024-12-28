import { Module } from '@nestjs/common';
import { ConsultZipcodeService } from './consult-zipcode.service';
import { ConsultZipcodeController } from './consult-zipcode.controller';
import { ConsultZipcode } from '@pure-workspace/domain';
import {
  ConsultZipcodeRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ConsultZipcodeController],
  providers: [
    ConsultZipcodeService,
    ConsultZipcode,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ConsultZipcodeRepository',
      useClass: ConsultZipcodeRepositoryImpl,
    },
  ],
})
export class ConsultZipcodeModule {}
