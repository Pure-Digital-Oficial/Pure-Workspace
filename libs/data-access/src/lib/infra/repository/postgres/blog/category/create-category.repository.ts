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
    } = input;

    const createdCategory = await this.prismaService[
      'generalPrisma'
    ].category.create({
      data: {
        name,
        description,
        created_by: loggedUserId,
        updated_by: loggedUserId,
      },
    });

    return createdCategory.category_id ?? '';
  }
}
