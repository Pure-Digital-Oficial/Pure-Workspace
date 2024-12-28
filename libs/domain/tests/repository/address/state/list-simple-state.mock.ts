import {
  ListSimpleStateDto,
  ListSimpleStateRepository,
  ListSimpleStateResponseDto,
} from '../../../../src';
import { ListSimpleStateMock } from '../../../entity/address/state/simple-state.mock';

export class ListSimpleStateRepositoryMock
  implements ListSimpleStateRepository
{
  inputMock = {} as ListSimpleStateDto;
  async list(input: ListSimpleStateDto): Promise<ListSimpleStateResponseDto[]> {
    this.inputMock = input;
    return [ListSimpleStateMock];
  }
}
