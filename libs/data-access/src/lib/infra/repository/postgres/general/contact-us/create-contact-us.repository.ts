import { Inject } from '@nestjs/common';
import {
  CreateContactUsDto,
  CreateContactUsRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreateContactUsRepositoryImpl
  implements CreateContactUsRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateContactUsDto): Promise<string> {
    const {
      appId,
      body: { description, email, name, number },
    } = input;

    const createdContact = await this.prismaService[
      'generalPrisma'
    ].contact.create({
      data: {
        description,
        email,
        name,
        number,
        app_id: appId,
      },
    });

    return createdContact?.contact_id ?? '';
  }
}
