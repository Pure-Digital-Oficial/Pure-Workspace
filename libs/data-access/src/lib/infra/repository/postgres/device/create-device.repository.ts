import { Inject } from '@nestjs/common';
import { CreateDeviceDto, CreateDeviceRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class CreateDeviceRepositoryImpl implements CreateDeviceRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateDeviceDto): Promise<string> {
    const {
      body: { name },
      loggedUserId,
      companyId,
    } = input;

    const createdDevice = await this.prismaService.generalPrisma.device.create({
      data: {
        name: name,
        user_id: loggedUserId,
        company_id: companyId,
      },
    });

    return createdDevice.device_id;
  }
}
