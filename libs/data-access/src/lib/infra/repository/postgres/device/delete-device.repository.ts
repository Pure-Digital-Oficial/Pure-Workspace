import { Inject } from '@nestjs/common';
import {
  DeleteDeviceDto,
  DeleteDeviceRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeleteDeviceRepositoryImpl implements DeleteDeviceRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteDeviceDto): Promise<void> {
    const { id } = input;

    await this.prismaService.generalPrisma.device.delete({
      where: {
        device_id: id,
      },
    });
  }
}
