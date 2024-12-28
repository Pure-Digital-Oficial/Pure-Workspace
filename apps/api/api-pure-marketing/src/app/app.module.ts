import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreatePreRegistrationModule,
  UpdatePreRegistrationModule,
} from './pre-registration';

@Module({
  imports: [CreatePreRegistrationModule, UpdatePreRegistrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
