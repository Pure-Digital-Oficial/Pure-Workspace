import { Inject } from '@nestjs/common';
import {
  ListProductDto,
  ListProductRepository,
  ListProductResponseDto,
  ProductResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListProductRepositoryImpl implements ListProductRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListProductDto): Promise<ListProductResponseDto> {
    const { filter } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(filter !== ''
        ? {
            name: {
              contains: filter,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };

    const [products, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.product.findMany({
          where: whereClause,
          select: {
            product_id: true,
            created_at: true,
            description: true,
            name: true,
            maximum_discount: true,
            standard_price: true,
            status: true,
            updated_at: true,
            user_created: {
              select: {
                name: true,
              },
            },
            user_updated: {
              select: {
                name: true,
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.product.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.product.count(),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedProduct: ProductResponseDto[] = products.map((product) => {
      return {
        createdAt: product.created_at ?? new Date(),
        createdBy: product.user_created.name ?? '',
        description: product.description ?? '',
        id: product.product_id ?? '',
        maximumDiscount: product.maximum_discount ?? '',
        name: product.name ?? '',
        standardPrice: product.standard_price ?? '',
        updatedAt: product.updated_at ?? new Date(),
        updatedBy: product.user_updated.name ?? '',
        status: product.status ?? 'INACTIVE',
      };
    });

    return {
      filteredTotal,
      products: mappedProduct,
      total,
      totalPages,
    };
  }
}
