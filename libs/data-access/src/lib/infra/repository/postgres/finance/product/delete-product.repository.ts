import { Inject } from '@nestjs/common';
import { DeleteProductDto, DeleteProductRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class DeleteProductRepositoryImpl implements DeleteProductRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteProductDto): Promise<string> {
    const { id } = input;

    const deleteProduct = await this.prismaService.generalPrisma.product.delete(
      {
        where: {
          product_id: id,
        },
      }
    );

    return deleteProduct.product_id ?? '';
  }
}
