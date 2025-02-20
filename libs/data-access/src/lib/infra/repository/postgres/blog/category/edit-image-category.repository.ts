import { Inject } from '@nestjs/common';
import {
  EditImageCategoryDto,
  EditImageCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class EditImageCategoryRepositoryImpl
  implements EditImageCategoryRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditImageCategoryDto): Promise<string> {
    const { loggedUserId, categoryId, image } = input;

    const editedCategory = await this.prismaService[
      'generalPrisma'
    ].category.update({
      where: {
        category_id: categoryId,
      },
      data: {
        url_image: image.path,
        image_name: image.filename,
        updated_by: loggedUserId,
      },
    });

    return editedCategory.category_id ?? '';
  }
}
