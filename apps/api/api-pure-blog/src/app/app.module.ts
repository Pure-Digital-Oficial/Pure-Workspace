import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateCategoryModule,
  EditCategoryModule,
  DeleteCategoryModule,
  ListCategoryModule,
  EditImageCategoryModule,
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
  AddDraftToPostModule,
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
    EditImageCategoryModule,
    ListCategoryModule,
    CreateMediaPostModule,
    ListMediasPostModule,
    EditMediaPostModule,
    DeleteMediaPostModule,
    CreateDraftPostModule,
    DeleteDraftPostModule,
    AddDraftToPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
