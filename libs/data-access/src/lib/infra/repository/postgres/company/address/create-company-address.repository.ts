import { Inject } from '@nestjs/common';
import {
  CreateCompanyAddressDto,
  CreateCompanyAddressRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreateCompanyAddressRepositoryImpl
  implements CreateCompanyAddressRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateCompanyAddressDto): Promise<string> {
    const {
      body: { cityId, district, number, street, zipcode, complement },
      companyId,
    } = input;

    const createdCompanyAddress =
      await this.prismaService.generalPrisma.address.create({
        data: {
          city_id: cityId,
          district: district,
          number: number,
          street: street,
          zipcode: zipcode,
          complement: complement ?? '',
        },
      });

    await this.prismaService.generalPrisma.company_X_Address.create({
      data: {
        company_id: companyId,
        address_id: createdCompanyAddress.address_id,
      },
    });

    return createdCompanyAddress.address_id;
  }
}
