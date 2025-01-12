import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCategoryModule, EditCategoryModule } from './category';
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
} from './post';
import { DeleteCategoryModule } from './category/delete-category/delete-category.module';

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
    CreateMediaPostModule,
    ListMediasPostModule,
    EditMediaPostModule,
    DeleteMediaPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
