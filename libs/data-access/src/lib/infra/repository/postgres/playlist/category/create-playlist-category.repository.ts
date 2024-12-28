import { Inject } from '@nestjs/common';
import {
  CreatePlaylistCategoryDto,
  CreatePlaylistCategoryRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreatePlaylistCategoryRepositoryImpl
  implements CreatePlaylistCategoryRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreatePlaylistCategoryDto): Promise<string> {
    const { loggedUserId, companyId, body } = input;

    const createdPlaylist =
      await this.prismaService.generalPrisma.playlist_Category.create({
        data: {
          name: body.name,
          description: body.description,
          user_id: loggedUserId,
          company_id: companyId,
        },
      });

    return createdPlaylist.playlist_category_id;
  }
}
