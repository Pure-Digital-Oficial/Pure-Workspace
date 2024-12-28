import { Module } from '@nestjs/common';
import { EditContentFileService } from './edit-content-file.service';
import { EditContentFileController } from './edit-content-file.controller';
import {
  EditContentFileRepositoryImpl,
  FindContentFileByIdRepositoryImpl,
  FindDirectoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { EditContentFile } from '@pure-workspace/domain';

@Module({
  controllers: [EditContentFileController],
  providers: [
    EditContentFile,
    EditContentFileService,
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
      provide: 'EditContentFileRepository',
      useClass: EditContentFileRepositoryImpl,
    },
  ],
})
export class EditContentFileModule {}
