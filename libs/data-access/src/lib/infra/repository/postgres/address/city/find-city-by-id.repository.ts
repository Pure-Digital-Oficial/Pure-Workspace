import { Inject } from '@nestjs/common';
import {
  CityResponseDto,
  FindCityByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCityByIdRepositoryImpl implements FindCityByIdRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<CityResponseDto> {
    const filteredCity = await this.prismaService.generalPrisma.city.findUnique(
      {
        where: {
          city_id: id,
        },
        select: {
          city_id: true,
          name: true,
        },
      }
    );
    return {
      id: filteredCity?.city_id ?? '',
      name: filteredCity?.name ?? '',
    };
  }
}
