import { ConsultZipcodeDto, SimpleAddressResponseDto } from '../../dto';

export interface ConsultZipcodeRepository {
  consult(input: ConsultZipcodeDto): Promise<SimpleAddressResponseDto>;
}
