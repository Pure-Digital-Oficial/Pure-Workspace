import { EditSchedulingDto, EditSchedulingRepository } from '../../../src';
import { SchedulingMock } from '../../entity';

export class EditSchedulingRepositoryMock implements EditSchedulingRepository {
  inputMock = {} as EditSchedulingDto;
  async edit(input: EditSchedulingDto): Promise<string> {
    this.inputMock = input;
    return SchedulingMock.id;
  }
}
