import {
  ConsultZipcodeDto,
  ConsultZipcodeRepository,
  SimpleAddressResponseDto,
} from '../../../src';
import { SimpleAddressMock } from '../../entity/address/simple-address.mock';

export class ConsultZipcodeRepositoryMock implements ConsultZipcodeRepository {
  inputMock = {} as ConsultZipcodeDto;
  async consult(input: ConsultZipcodeDto): Promise<SimpleAddressResponseDto> {
    this.inputMock = input;
    return SimpleAddressMock;
  }
}
