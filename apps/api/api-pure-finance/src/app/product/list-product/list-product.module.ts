import { Module } from '@nestjs/common';
import {
  FindUserByIdRepositoryImpl,
  ListProductRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { ListProduct } from '@pure-workspace/domain';
import { ListProductController } from './list-product.controller';
import { ListProductService } from './list-product.service';

@Module({
  imports: [],
  controllers: [ListProductController],
  providers: [
    ListProduct,
    ListProductService,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListProductRepository',
      useClass: ListProductRepositoryImpl,
    },
  ],
})
export class ListProductModule {}
