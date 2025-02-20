import { Inject } from '@nestjs/common';
import {
  CategoryResponseDto,
  ListCategoryDto,
  ListCategoryRepository,
  ListCategoryResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListCategoryRepositoryImpl implements ListCategoryRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(input: ListCategoryDto): Promise<ListCategoryResponseDto> {
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

    const [categories, filteredTotal, total] = await this.prismaService[
      'generalPrisma'
    ].$transaction([
      this.prismaService['generalPrisma'].category.findMany({
        where: {
          ...whereClause,
        },
        select: {
          category_id: true,
          name: true,
          description: true,
          url_image: true,
          image_name: true,
          created_at: true,
          updated_at: true,
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['generalPrisma'].category.count({
        where: {
          ...whereClause,
        },
      }),
      this.prismaService['generalPrisma'].post.count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedCategories: CategoryResponseDto[] = categories.map(
      (category: CategoryResponseDto) => {
        return {
          categoryId: category.id,
          name: category.name,
          description: category.description,
          url_image: category.url_image,
          image_name: category.image_name,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        };
      }
    );

    return {
      filteredTotal,
      total,
      totalPages,
      categories: mappedCategories,
    };
  }
}
