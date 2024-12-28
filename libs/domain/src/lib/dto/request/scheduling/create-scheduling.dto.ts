import { CreateSchedulingBodyDto } from './create-scheduling-body.dto';

export interface CreateSchedulingDto {
  loggedUserId: string;
  companyId: string;
  body: CreateSchedulingBodyDto;
}
