import { Module } from '@nestjs/common';
import {
  CreateProductModule,
  ListProductModule,
  DeleteProductModule,
  EditProductModule,
  ChangeProductStatusModule,
} from './product';
import { CreatePaymentModelModule } from './payment-model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CreateProductModule,
    ListProductModule,
    DeleteProductModule,
    EditProductModule,
    ChangeProductStatusModule,
    CreatePaymentModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
