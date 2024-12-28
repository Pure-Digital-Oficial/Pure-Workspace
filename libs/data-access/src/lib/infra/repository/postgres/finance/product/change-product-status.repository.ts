import { Inject } from '@nestjs/common';
import {
  ChangeProductStatusDto,
  ChangeProductStatusRepository,
  GeneralStatus,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ChangeProductStatusRepositoryImpl
  implements ChangeProductStatusRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async change(input: ChangeProductStatusDto): Promise<string> {
    const { id, loggedUserId, status } = input;

    const changedProduct =
      await this.prismaService.generalPrisma.product.update({
        where: {
          product_id: id,
        },
        data: {
          updated_by: loggedUserId,
          updated_at: new Date(),
          status: status as GeneralStatus,
        },
      });

    return changedProduct.product_id ?? '';
  }
}
