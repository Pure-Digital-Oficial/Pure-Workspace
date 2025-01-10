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
} from './post';

@Module({
  imports: [
    CreatePostModule,
    ListPostsModule,
    DeletePostModule,
    EditPostModule,
    ListUserPostsModule,
    CreateCategoryModule,
    EditCategoryModule,
    CreateMediaPostModule,
    ListMediasPostModule,
    EditMediaPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
