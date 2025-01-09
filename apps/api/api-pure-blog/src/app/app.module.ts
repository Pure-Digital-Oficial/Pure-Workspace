import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCategoryModule } from './category';
import {
  CreatePostModule,
  ListPostsModule,
  DeletePostModule,
  EditPostModule,
  CreateMediaPostModule,
  ListUserPostsModule,
  ListMediasPostModule,
} from './post';

@Module({
  imports: [
    CreatePostModule,
    ListPostsModule,
    DeletePostModule,
    EditPostModule,
    ListUserPostsModule,
    CreateCategoryModule,
    CreateMediaPostModule,
    ListMediasPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
