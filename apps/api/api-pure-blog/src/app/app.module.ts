import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostModule, ListPostsModule, DeletePostModule } from './post';

@Module({
  imports: [CreatePostModule, ListPostsModule, DeletePostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
