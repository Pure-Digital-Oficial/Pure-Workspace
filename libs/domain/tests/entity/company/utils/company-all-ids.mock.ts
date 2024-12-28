import { CompanyAllIdsResponseDto } from '../../../../src';
import { CompanySimpleMock } from '../simple';
import { CompanyAddressMock } from '../address';
import { CompanyDataMock } from '../data';
import { CompanyResponsibleMock } from '../responsible';

export const companyAllIdsMock: CompanyAllIdsResponseDto = {
  companyAddressId: CompanyAddressMock.id,
  companyDataId: CompanyDataMock.id,
  companySimpleId: CompanySimpleMock.id,
  companyResponsibleId: CompanyResponsibleMock.id,
};
