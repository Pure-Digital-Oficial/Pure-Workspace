import { CompanyStatus } from '../../../type';

export interface ListCompaniesByUserPrismaDto {
  company: {
    company_id: string;
    status: CompanyStatus;
    created_at: Date;
    user: {
      nick_name: string;
    };
    fantasy_name: string;
    social_reason: string;
    cnpj: string;
    company_x_address: {
      address: {
        city: {
          name: string;
        };
      };
    }[];
  };
}
