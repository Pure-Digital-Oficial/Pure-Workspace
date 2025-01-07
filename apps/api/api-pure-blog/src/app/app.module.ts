import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
