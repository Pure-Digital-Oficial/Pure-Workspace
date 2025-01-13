import { Inject } from '@nestjs/common';
import {
  DeleteCategoryDto,
  DeleteCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class DeleteCategoryRepositoryImpl implements DeleteCategoryRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteCategoryDto): Promise<string> {
    const { id } = input;
    const deletedCategory = await this.prismaService[
      'generalPrisma'
    ].category.delete({
      where: {
        category_id: id,
      },
    });

    return deletedCategory.category_id ?? '';
  }
}
