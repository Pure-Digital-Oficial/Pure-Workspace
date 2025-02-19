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
  AddDraftToPostModule,
} from './post';
import { CreateSubCategoryModule, EditSubCategoryModule } from './sub-category';

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
    AddDraftToPostModule,
    CreateSubCategoryModule,
    EditSubCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
