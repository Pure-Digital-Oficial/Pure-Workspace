import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateCategoryModule,
  EditCategoryModule,
  DeleteCategoryModule,
  ListCategoryModule,
} from './category';
import {
  CreatePostModule,
  ListPostsModule,
  DeletePostModule,
  EditPostModule,
  CreateMediaPostModule,
  ListUserPostsModule,
  ListMediasPostModule,
  EditMediaPostModule,
  DeleteMediaPostModule,
  CreateDraftPostModule,
  DeleteDraftPostModule,
} from './post';

@Module({
  imports: [
    CreatePostModule,
    ListPostsModule,
    DeletePostModule,
    EditPostModule,
    ListUserPostsModule,
    CreateCategoryModule,
    DeleteCategoryModule,
    EditCategoryModule,
    ListCategoryModule,
    CreateMediaPostModule,
    ListMediasPostModule,
    EditMediaPostModule,
    DeleteMediaPostModule,
    CreateDraftPostModule,
    DeleteDraftPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
