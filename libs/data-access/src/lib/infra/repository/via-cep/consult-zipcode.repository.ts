import {
  ConsultZipcodeDto,
  ConsultZipcodeRepository,
  SimpleAddressResponseDto,
  ViaCepAddressResponseDto,
} from '@pure-workspace/domain';
import axios from 'axios';

export class ConsultZipcodeRepositoryImpl implements ConsultZipcodeRepository {
  async consult(input: ConsultZipcodeDto): Promise<SimpleAddressResponseDto> {
    const response = await axios.get<ViaCepAddressResponseDto>(
      `https://viacep.com.br/ws/${input.zipcode}/json/`
    );

    const { data } = response;
    if (!data?.cep) {
      return {} as SimpleAddressResponseDto;
    }

    return {
      city: data.localidade
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase(),
      country: 'Brasil'.toUpperCase(),
      district: data.bairro,
      state: data.uf,
      street: data.logradouro,
      zipcode: data.cep.replace(/[^\d]+/g, ''),
    };
  }
}
