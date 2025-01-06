import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostModule, ListPostsModule } from './post';

@Module({
  imports: [CreatePostModule, ListPostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
