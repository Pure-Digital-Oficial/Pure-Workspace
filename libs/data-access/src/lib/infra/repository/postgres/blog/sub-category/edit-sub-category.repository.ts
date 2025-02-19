import { Inject } from '@nestjs/common';
import {
  EditSubCategoryDto,
  EditSubCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class EditSubCategoryRepositoryImpl
  implements EditSubCategoryRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditSubCategoryDto): Promise<string> {
    const {
      id,
      loggedUserId,
      body: { name, description, categoryId },
    } = input;

    const editedSubCategory = await this.prismaService[
      'generalPrisma'
    ].sub_Category.update({
      where: {
        sub_category_id: id,
      },
      data: {
        name,
        description,
        category_id: categoryId,
        updated_by: loggedUserId,
        updated_at: new Date(),
      },
    });

    return editedSubCategory.sub_category_id ?? '';
  }
}
