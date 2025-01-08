import { Inject } from '@nestjs/common';
import {
  EditCategoryDto,
  EditCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class EditCategoryRepositoryImpl implements EditCategoryRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditCategoryDto): Promise<string> {
    const {
      id,
      loggedUserId,
      body: { name, description },
    } = input;

    const editedCategory = await this.prismaService[
      'generalPrisma'
    ].category.update({
      where: {
        category_id: id,
      },
      data: {
        name,
        description,
        updated_by: loggedUserId,
      },
    });

    return editedCategory.category_id ?? '';
  }
}
