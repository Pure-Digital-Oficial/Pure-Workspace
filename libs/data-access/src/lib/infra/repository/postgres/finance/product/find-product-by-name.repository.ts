import {
  FindProductByNameDto,
  FindProductByNameRespository,
  ProductResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';
import { Inject } from '@nestjs/common';

export class FindProductByNameRepositoryImpl
  implements FindProductByNameRespository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindProductByNameDto): Promise<ProductResponseDto> {
    const { name } = input;

    const filteredProduct =
      await this.prismaService.generalPrisma.product.findFirst({
        where: {
          name: name,
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
