import { Inject } from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class CreateCategoryRepositoryImpl implements CreateCategoryRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateCategoryDto): Promise<string> {
    const {
      loggedUserId,
      body: { name, description },
      // name,
      // description,
      file,
    } = input;

    console.log('originalname', file.originalname);
    console.log('file', file);

    const createdCategory = await this.prismaService[
      'generalPrisma'
    ].category.create({
      data: {
        name,
        description,
        url_image: file.path,
        image_name: file.originalname?.split('.')[0],
        created_by: loggedUserId,
        updated_by: loggedUserId,
      },
    });

    return createdCategory.category_id ?? '';
  }
}
