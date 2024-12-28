import { Module } from '@nestjs/common';
import { DetailsContentFileService } from './details-content-file.service';
import { DetailsContentFileController } from './details-content-file.controller';
import { DetailsContentFile } from '@pure-workspace/domain';
import {
  FindContentFileByIdRepositoryImpl,
  FindDirectoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DetailsContentFileController],
  providers: [
    DetailsContentFileService,
    DetailsContentFile,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindDirectoryByIdRepository',
      useClass: FindDirectoryByIdRepositoryImpl,
    },
    {
      provide: 'FindContentFileByIdRepository',
      useClass: FindContentFileByIdRepositoryImpl,
    },
  ],
})
export class DetailsContentFileModule {}
