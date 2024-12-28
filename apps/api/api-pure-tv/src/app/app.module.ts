import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import {
  ListContentFileModule,
  EditContentFileModule,
  DetailsContentFileModule,
  DeleteContentFileByIdModule,
  CreateContentFileModule,
  DownloadContentFileModule,
  MoveFileToDirectoryModule,
} from './file';
import { FileS3Storage } from '@pure-workspace/data-access';
import {
  CreatePlaylistCategoryModule,
  ListPlaylistCategoryModule,
  EditPlaylistCategoryModule,
  FindPlaylistCategoryByIdModule,
  DeletePlaylistCategoryModule,
} from './playlist-category';
import {
  CreatePlaylistModule,
  ListPlaylistModule,
  FindPlaylistByIdModule,
  EditPlaylistModule,
  DeletePlaylistModule,
  DetailsPlaylistModule,
} from './playlist';
import {
  AddFileToPlaylistModule,
  FindFilesByPlaylistModule,
  MoveFilesToAnotherPlaylistModule,
  DeletePlaylistFilesModule,
} from './file-to-playlist';
import {
  CreateSchedulingModule,
  ListSchedulesModule,
  DeleteSchedulingModule,
  EditSchedulingModule,
  FindSchedulingByIdModule,
} from './scheduling';
import {
  AddPlaylistsToSchedulingModule,
  ListPlaylistBySchedulingIdModule,
  DeletePlaylistToSchedulingModule,
} from './playlist-to-scheduling';
import {
  CreateDeviceModule,
  ListDeviceModule,
  DeleteDeviceModule,
  EditDeviceModule,
  FindDeviceByIdModule,
} from './device';
import {
  AddSchedulesToDeviceModule,
  FindSchedulesByDeviceIdModule,
  DeleteSchedulesToDeviceModule,
  MoveSchedulesToAnotherDeviceModule,
} from './schedules-to-device';
import {
  ListSimpleDirectoryModule,
  CreateDirectoryModule,
  ListDirectoryModule,
  DeleteDirectoryModule,
  EditDirectoryModule,
} from './directory';

@Module({
  imports: [
    CreateContentFileModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: FileS3Storage.Storage,
      }),
    }),
    ListContentFileModule,
    DeleteContentFileByIdModule,
    DetailsContentFileModule,
    EditContentFileModule,
    DownloadContentFileModule,
    MoveFileToDirectoryModule,
    CreatePlaylistCategoryModule,
    ListPlaylistCategoryModule,
    EditPlaylistCategoryModule,
    FindPlaylistCategoryByIdModule,
    DeletePlaylistCategoryModule,
    CreatePlaylistModule,
    ListPlaylistModule,
    FindPlaylistByIdModule,
    EditPlaylistModule,
    DeletePlaylistModule,
    AddFileToPlaylistModule,
    ListSimpleDirectoryModule,
    DetailsPlaylistModule,
    FindFilesByPlaylistModule,
    CreateDirectoryModule,
    MoveFilesToAnotherPlaylistModule,
    DeletePlaylistFilesModule,
    ListDirectoryModule,
    CreateSchedulingModule,
    ListSchedulesModule,
    DeleteSchedulingModule,
    EditSchedulingModule,
    FindSchedulingByIdModule,
    AddPlaylistsToSchedulingModule,
    ListPlaylistBySchedulingIdModule,
    DeletePlaylistToSchedulingModule,
    CreateDeviceModule,
    ListDeviceModule,
    DeleteDeviceModule,
    EditDeviceModule,
    FindDeviceByIdModule,
    AddSchedulesToDeviceModule,
    FindSchedulesByDeviceIdModule,
    DeleteSchedulesToDeviceModule,
    ListDirectoryModule,
    MoveSchedulesToAnotherDeviceModule,
    DeleteDirectoryModule,
    EditDirectoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
