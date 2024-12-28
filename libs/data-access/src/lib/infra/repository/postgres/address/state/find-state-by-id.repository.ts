import { Inject } from '@nestjs/common';
import {
  CityPrismaDto,
  CityResponseDto,
  FindStateByIdRepository,
  StateResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindStateByIdRepositoryImpl implements FindStateByIdRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<StateResponseDto> {
    const filteredState =
      await this.prismaService.generalPrisma.state.findUnique({
        where: {
          state_id: id,
        },
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
      });

    const mappedCity: CityResponseDto[] =
      filteredState?.city.map((city: CityPrismaDto) => {
        return {
          id: city?.city_id ?? '',
          name: city?.name ?? '',
        };
      }) ?? [];

    return {
      id: filteredState?.state_id ?? '',
      name: filteredState?.name ?? '',
      uf: filteredState?.uf ?? '',
      cities: mappedCity,
    };
  }
}
