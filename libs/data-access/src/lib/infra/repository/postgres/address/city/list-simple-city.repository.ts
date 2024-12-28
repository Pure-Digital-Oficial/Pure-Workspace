import { Inject } from '@nestjs/common';
import {
  CityPrismaDto,
  CityResponseDto,
  ListSimpleCityDto,
  ListSimpleCityRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListSimpleCityRepositoryImpl implements ListSimpleCityRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListSimpleCityDto): Promise<CityResponseDto[]> {
    const listCities = await this.prismaService.generalPrisma.city.findMany({
      where: {
        state_id: input.stateId,
      },
      select: {
        city_id: true,
        name: true,
      },
    });

    const mappedCities: CityResponseDto[] = listCities.map(
      (city: CityPrismaDto) => {
        return {
          id: city.city_id,
          name: city.name,
        };
      }
    );

    return mappedCities;
  }
}
