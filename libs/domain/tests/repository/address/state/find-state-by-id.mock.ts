import { StateResponseDto } from '../../../../src';
import { FindStateByIdRepository } from '../../../../src/lib/repository/address';
import { StateMock } from '../../../entity';

export class FindStateByIdRepositoryMock implements FindStateByIdRepository {
  inputMock = '';
  async find(id: string): Promise<StateResponseDto> {
    this.inputMock = id;
    return StateMock;
  }
}
