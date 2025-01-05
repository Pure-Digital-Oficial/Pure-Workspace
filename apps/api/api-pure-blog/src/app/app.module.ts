import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostModule } from './post';

@Module({
  imports: [CreatePostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
