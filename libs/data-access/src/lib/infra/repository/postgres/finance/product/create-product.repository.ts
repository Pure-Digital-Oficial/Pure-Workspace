import { Inject } from '@nestjs/common';
import { CreateProductDto, CreateProductRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreateProductRepositoryImpl implements CreateProductRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateProductDto): Promise<string> {
    const {
      body: { description, maximumDiscount, name, standardPrice },
      loggedUserId,
    } = input;

    const createadProduct =
      await this.prismaService.generalPrisma.product.create({
        data: {
          name,
          description,
          maximum_discount: maximumDiscount,
          standard_price: standardPrice,
          created_by: loggedUserId,
          updated_by: loggedUserId,
        },
      });

    return createadProduct?.product_id ?? '';
  }
}
