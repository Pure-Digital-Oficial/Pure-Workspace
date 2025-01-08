import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCategoryModule, EditCategoryModule } from './category';
import {
  CreatePostModule,
  ListPostsModule,
  DeletePostModule,
  EditPostModule,
} from './post';

@Module({
  imports: [
    CreatePostModule,
    ListPostsModule,
    DeletePostModule,
    EditPostModule,
    CreateCategoryModule,
    EditCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
