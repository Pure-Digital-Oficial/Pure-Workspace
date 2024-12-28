import { CompanyResponseDto } from '../../../../src';
import { CompanySimpleMock } from '../simple';
import { CompanyAddressMock } from '../address';
import { CompanyDataMock } from '../data';

export const CompanyMock: CompanyResponseDto = {
  data: CompanyDataMock,
  address: CompanyAddressMock,
  simple: CompanySimpleMock,
};
