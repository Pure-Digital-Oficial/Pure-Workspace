import { Module } from '@nestjs/common';

import { DeleteProductController } from './delete-product.controller';
import { DeleteProductService } from './delete-product.service';
import {
  DeleteProductRepositoryImpl,
  FindProductByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

import { DeleteProduct } from '@pure-workspace/domain';

@Module({
  imports: [],
  controllers: [DeleteProductController],
  providers: [
    DeleteProduct,
    DeleteProductService,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindProductByIdRepository',
      useClass: FindProductByIdRepositoryImpl,
    },
    {
      provide: 'DeleteProductRepository',
      useClass: DeleteProductRepositoryImpl,
    },
  ],
})
export class DeleteProductModule {}
