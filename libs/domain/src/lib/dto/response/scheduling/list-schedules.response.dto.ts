import { Scheduling } from '../../../entity';

export interface ListSchedulesReponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  schedules: Scheduling[];
}
