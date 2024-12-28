import {
  ListSchedulesDto,
  ListSchedulesReponseDto,
  ListSchedulesRepository,
} from '../../../src';
import { ListSchedulesReponseMock } from '../../entity';

export class ListSchedulesRepositoryMock implements ListSchedulesRepository {
  inputMock = {} as ListSchedulesDto;
  async list(input: ListSchedulesDto): Promise<ListSchedulesReponseDto> {
    this.inputMock = input;
    return ListSchedulesReponseMock;
  }
}
