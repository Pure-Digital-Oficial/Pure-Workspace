import { ListSchedulesDto, ListSchedulesReponseDto } from '../../dto';

export interface ListSchedulesRepository {
  list(input: ListSchedulesDto): Promise<ListSchedulesReponseDto>;
}
