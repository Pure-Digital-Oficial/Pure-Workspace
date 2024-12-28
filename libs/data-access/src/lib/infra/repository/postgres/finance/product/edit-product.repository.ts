import { Inject } from '@nestjs/common';
import { EditProductDto, EditProductRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class EditProductRepositoryImpl implements EditProductRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditProductDto): Promise<string> {
    const {
      id,
      loggedUserId,
      body: { description, maximumDiscount, name, standardPrice },
    } = input;

    const editedProduct = await this.prismaService.generalPrisma.product.update(
      {
        where: {
          product_id: id,
        },
        data: {
          description: description,
          maximum_discount: maximumDiscount,
          name: name,
          standard_price: standardPrice,
          updated_at: new Date(),
          updated_by: loggedUserId,
        },
      }
    );

    return editedProduct.product_id ?? '';
  }
}
