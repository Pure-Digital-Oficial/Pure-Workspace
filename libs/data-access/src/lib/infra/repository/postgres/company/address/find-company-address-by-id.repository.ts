import { Inject } from '@nestjs/common';
import {
  CompanyAddressResponseDto,
  FindCompanyAddressByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCompanyAddressByIdRepositoryImpl
  implements FindCompanyAddressByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<CompanyAddressResponseDto> {
    const filteredCompany =
      await this.prismaService.generalPrisma.address.findFirst({
        where: {
          address_id: id,
        },
        select: {
          address_id: true,
          city: {
            select: {
              name: true,
              state: {
                select: {
                  name: true,
                  country: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          street: true,
          district: true,
          zipcode: true,
          number: true,
          complement: true,
        },
      });

    return {
      id: filteredCompany?.address_id ?? '',
      district: filteredCompany?.district ?? '',
      city: filteredCompany?.city.name ?? '',
      state: filteredCompany?.city.state.name ?? '',
      street: filteredCompany?.street ?? '',
      zipcode: filteredCompany?.zipcode ?? '',
      country: filteredCompany?.city.state.country.name ?? '',
      number: filteredCompany?.number ?? '',
    };
  }
}
