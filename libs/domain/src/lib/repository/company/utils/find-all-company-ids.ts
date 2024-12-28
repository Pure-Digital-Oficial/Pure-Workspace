import { CompanyAllIdsResponseDto, FindAllCompanyIdsDto } from '../../../dto';

export interface FindAllCompanyIdsRepository {
  find(input: FindAllCompanyIdsDto): Promise<CompanyAllIdsResponseDto>;
}
