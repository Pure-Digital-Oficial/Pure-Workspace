import { Inject } from '@nestjs/common';
import {
  FindProductByIdRepository,
  ProductResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindProductByIdRepositoryImpl
  implements FindProductByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<ProductResponseDto> {
    const filteredProduct =
      await this.prismaService.generalPrisma.product.findFirst({
        where: {
          product_id: id,
        },
      });

    return {
      id: filteredProduct?.product_id ?? '',
      createdAt: filteredProduct?.created_at ?? new Date(),
      createdBy: filteredProduct?.created_by ?? '',
      description: filteredProduct?.description ?? '',
      maximumDiscount: filteredProduct?.maximum_discount ?? '',
      name: filteredProduct?.name ?? '',
      standardPrice: filteredProduct?.standard_price ?? '',
      updatedAt: filteredProduct?.updated_at ?? new Date(),
      updatedBy: filteredProduct?.updated_by ?? '',
      status: filteredProduct?.status ?? 'INACTIVE',
    };
  }
}
