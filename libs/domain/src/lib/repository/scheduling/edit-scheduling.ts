import { EditSchedulingDto } from '../../dto';

export interface EditSchedulingRepository {
  edit(input: EditSchedulingDto): Promise<string>;
}
