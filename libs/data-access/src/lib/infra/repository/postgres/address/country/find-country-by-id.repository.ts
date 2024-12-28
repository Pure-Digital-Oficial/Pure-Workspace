import { Inject } from '@nestjs/common';
import {
  CountryResponseDto,
  FindCountryByIdRepository,
  StatePrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCountryByIdRepositoryImpl
  implements FindCountryByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<CountryResponseDto> {
    const filteredCountry =
      await this.prismaService.generalPrisma.country.findUnique({
        where: {
          country_id: id,
        },
        select: {
          country_id: true,
          name: true,
          uf: true,
          state: {
            select: {
              state_id: true,
              name: true,
              uf: true,
              city: {
                select: {
                  city_id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

    const mappedState =
      filteredCountry?.state.map((state: StatePrismaDto) => {
        const mappedCity =
          state?.city.map((city) => {
            return {
              id: city?.city_id ?? '',
              name: city?.name ?? '',
            };
          }) ?? [];

        return {
          id: state?.state_id ?? '',
          name: state?.name ?? '',
          uf: state?.uf ?? '',
          cities: mappedCity,
        };
      }) ?? [];

    return {
      id: filteredCountry?.country_id ?? '',
      name: filteredCountry?.name ?? '',
      uf: filteredCountry?.uf ?? '',
      states: mappedState,
    };
  }
}
