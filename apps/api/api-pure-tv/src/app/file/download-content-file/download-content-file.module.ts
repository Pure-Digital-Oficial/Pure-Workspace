import { Module } from '@nestjs/common';
import { DownloadContentFileService } from './download-content-file.service';
import { DownloadContentFileController } from './download-content-file.controller';
import { DownloadContentFile } from '@pure-workspace/domain';
import {
  DownloadContentFileRepositoryImpl,
  FindContentFileByIdRepositoryImpl,
  FindDirectoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DownloadContentFileController],
  providers: [
    DownloadContentFileService,
    DownloadContentFile,
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
    {
      provide: 'DownloadContentFileRepository',
      useClass: DownloadContentFileRepositoryImpl,
    },
  ],
})
export class DownloadContentFileModule {}
