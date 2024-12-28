import { EditSchedulingBodyDto } from './edit-scheduling-body.dto';

export interface EditSchedulingDto {
  id: string;
  loggedUserId: string;
  body: EditSchedulingBodyDto;
}
