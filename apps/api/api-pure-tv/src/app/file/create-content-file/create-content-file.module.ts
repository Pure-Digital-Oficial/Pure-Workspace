import { Module } from '@nestjs/common';
import { CreateContentFileService } from './create-content-file.service';
import { CreateContentFileController } from './create-content-file.controller';
import { CreateContentFile } from '@pure-workspace/domain';
import {
  CreateContentFileRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindDirectoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  GenerateThumbnailRepositoryImpl,
  PrismaGeneralService,
  UploadContentFileRepositoryImpl,
} from '@pure-workspace/data-access';
@Module({
  controllers: [CreateContentFileController],
  providers: [
    CreateContentFileService,
    CreateContentFile,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'CreateContentFileRepository',
      useClass: CreateContentFileRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCompanyByIdRepository',
      useClass: FindCompanyByIdRepositoryImpl,
    },
    {
      provide: 'FindDirectoryByIdRepository',
      useClass: FindDirectoryByIdRepositoryImpl,
    },
    {
      provide: 'GenerateThumbnailRepository',
      useClass: GenerateThumbnailRepositoryImpl,
    },
    {
      provide: 'UploadContentFileRepository',
      useClass: UploadContentFileRepositoryImpl,
    },
  ],
})
export class CreateContentFileModule {}
