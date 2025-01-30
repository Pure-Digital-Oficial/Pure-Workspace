import { Inject } from '@nestjs/common';
import {
  CategoryResponseDto,
  FindCategoryByIdRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class FindCategoryByIdRepositoryImpl
  implements FindCategoryByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<CategoryResponseDto> {
    const findedCategory = await this.prismaService[
      'generalPrisma'
    ].category.findFirst({
      where: {
        category_id: id,
      },
      select: {
        category_id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        url_image: true,
        image_name: true,
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
    });

    return {
      id: findedCategory?.category_id ?? '',
      name: findedCategory?.name ?? '',
      description: findedCategory?.description ?? '',
      url_image: findedCategory?.url_image ?? '',
      image_name: findedCategory?.image_name ?? '',
      createdAt: findedCategory?.created_at ?? new Date(),
      createdBy: findedCategory?.user_created.name ?? '',
      updatedAt: findedCategory?.updated_at ?? new Date(),
      updatedBy: findedCategory?.user_updated.name ?? '',
    };
  }
}
