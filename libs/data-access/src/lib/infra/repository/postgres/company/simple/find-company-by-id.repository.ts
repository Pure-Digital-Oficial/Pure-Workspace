import { Inject } from '@nestjs/common';
import {
  CompanyResponseDto,
  FindCompanyByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCompanyByIdRepositoryImpl
  implements FindCompanyByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async find(id: string): Promise<CompanyResponseDto> {
    const filteredCompany =
      await this.prismaService.generalPrisma.company.findFirst({
        where: {
          company_id: id,
        },
        select: {
          company_id: true,
          cnpj: true,
          fantasy_name: true,
          social_reason: true,
          created_at: true,
          company_data: {
            where: {
              company_id: id,
            },
            select: {
              company_data_id: true,
              legal_nature: true,
              opening: true,
              phone: true,
              port: true,
              situation: true,
              responsible_email: true,
            },
          },
          company_x_address: {
            where: {
              company_id: id,
            },
            select: {
              address: {
                select: {
                  city: {
                    select: {
                      name: true,
                      state: {
                        select: {
                          country: {
                            select: {
                              name: true,
                            },
                          },
                          name: true,
                          uf: true,
                        },
                      },
                    },
                  },
                  address_id: true,
                  complement: true,
                  district: true,
                  number: true,
                  street: true,
                  zipcode: true,
                },
              },
            },
          },
        },
      });

    const mappedCompany: CompanyResponseDto = {
      data: {
        id: filteredCompany?.company_data[0]?.company_data_id ?? '',
        phone: filteredCompany?.company_data[0]?.phone ?? '',
        situation: filteredCompany?.company_data[0]?.situation ?? '',
        legalNature: filteredCompany?.company_data[0]?.legal_nature ?? '',
        opening: filteredCompany?.company_data[0]?.opening ?? '',
        port: filteredCompany?.company_data[0]?.port ?? '',
        responsibleEmail:
          filteredCompany?.company_data[0]?.responsible_email ?? '',
      },
      address: {
        city: filteredCompany?.company_x_address[0]?.address.city.name ?? '',
        complement:
          filteredCompany?.company_x_address[0]?.address.complement ?? '',
        country:
          filteredCompany?.company_x_address[0]?.address.city.state.country
            .name ?? '',
        district: filteredCompany?.company_x_address[0]?.address.district ?? '',
        number: filteredCompany?.company_x_address[0]?.address.number ?? '',
        state:
          filteredCompany?.company_x_address[0]?.address.city.state.name ?? '',
        street: filteredCompany?.company_x_address[0]?.address.street ?? '',
        zipcode: filteredCompany?.company_x_address[0]?.address.zipcode ?? '',
        id: '',
      },
      simple: {
        id: filteredCompany?.company_id ?? '',
        cnpj: filteredCompany?.cnpj ?? '',
        fantasyName: filteredCompany?.fantasy_name ?? '',
        socialReason: filteredCompany?.social_reason ?? '',
      },
    };

    return mappedCompany;
  }
}
