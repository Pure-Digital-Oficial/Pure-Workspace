import { Inject } from '@nestjs/common';
import {
  ListSimpleStateDto,
  ListSimpleStateRepository,
  ListSimpleStateResponseDto,
  StatePrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListSimpleStateRepositoryImpl
  implements ListSimpleStateRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListSimpleStateDto): Promise<ListSimpleStateResponseDto[]> {
    const listStates = await this.prismaService.generalPrisma.state.findMany({
      where: {
        coutry_id: input.countryId,
      },
      select: {
        uf: true,
        name: true,
        state_id: true,
      },
    });

    const mappedSimpleState: ListSimpleStateResponseDto[] = listStates.map(
      (state: Omit<StatePrismaDto, 'city'>) => {
        return {
          id: state.state_id,
          name: state.name,
          uf: state.uf,
        };
      }
    );

    return mappedSimpleState;
  }
}
