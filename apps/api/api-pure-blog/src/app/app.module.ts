import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostModule, ListPostsModule } from './post';
import { CreateCategoryModule } from './category';

@Module({
  imports: [CreatePostModule, ListPostsModule, CreateCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
