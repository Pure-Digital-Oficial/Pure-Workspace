import {
  CompanySimpleResponseDto,
  FindSimpleCompanyByIdDto,
} from '../../../dto';

export interface FindSimpleCompanyByIdRepository {
  find(input: FindSimpleCompanyByIdDto): Promise<CompanySimpleResponseDto>;
}
