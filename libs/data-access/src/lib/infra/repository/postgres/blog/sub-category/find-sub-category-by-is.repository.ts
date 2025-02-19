import { Inject } from '@nestjs/common';
import {
  FindSubCategoryByIdRepository,
  SubCategoryResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class FindSubCategoryByIdRepositoryImpl
  implements FindSubCategoryByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async find(id: string): Promise<SubCategoryResponseDto> {
    const findedSubCategory = await this.prismaService[
      'generalPrisma'
    ].sub_Category.findFirst({
      where: {
        sub_category_id: id,
      },
      select: {
        sub_category_id: true,
        name: true,
        description: true,
        category_id: true,
        created_at: true,
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
    });

    return {
      id: findedSubCategory?.sub_category_id ?? '',
      name: findedSubCategory?.name ?? '',
      description: findedSubCategory?.description ?? '',
      categoryId: findedSubCategory?.category_id ?? '',
      createdAt: findedSubCategory?.created_at ?? new Date(),
      createdBy: findedSubCategory?.user_created.name ?? '',
      updatedAt: findedSubCategory?.updated_at ?? new Date(),
      updatedBy: findedSubCategory?.user_updated.name ?? '',
    };
  }
}
