import { Inject } from '@nestjs/common';
import {
  CreateSubCategoryDto,
  CreateSubCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class CreateSubCategoryRepositoryImpl
  implements CreateSubCategoryRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateSubCategoryDto): Promise<string> {
    const {
      loggedUserId,
      body: { name, description, categoryId },
    } = input;

    const createdSubCategory = await this.prismaService[
      'generalPrisma'
    ].subCategory.create({
      data: {
        name,
        description,
        category_id: categoryId,
        created_by: loggedUserId,
        updated_by: loggedUserId,
      },
    });

    return createdSubCategory.sub_category_id ?? '';
  }
}
