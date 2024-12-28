import { Inject } from '@nestjs/common';
import { EditDeviceDto, EditDeviceRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class EditDeviceRepositoryImpl implements EditDeviceRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditDeviceDto): Promise<string> {
    const { id, name } = input;

    const editedDevice = await this.prismaService.generalPrisma.device.update({
      where: {
        device_id: id,
      },
      data: {
        name,
      },
    });

    return editedDevice.device_id;
  }
}
