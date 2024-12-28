import { Inject } from '@nestjs/common';
import {
  CountryPrismaDto,
  ListSimpleCountryRepository,
  ListSimpleCountryResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListSimpleCountryRepositoryImpl
  implements ListSimpleCountryRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(): Promise<ListSimpleCountryResponseDto[]> {
    const listCountry = await this.prismaService.generalPrisma.country.findMany(
      {
        select: {
          name: true,
          uf: true,
          country_id: true,
        },
      }
    );

    const mappedCountry: ListSimpleCountryResponseDto[] = listCountry.map(
      (country: CountryPrismaDto) => {
        return {
          id: country?.country_id ?? '',
          name: country?.name ?? '',
          uf: country?.uf ?? '',
        };
      }
    );

    return mappedCountry;
  }
}
