import { CompanyStatus } from '../../../../type';

export interface CompanyPrismaDto {
  fantasy_name: string;
  social_reason: string;
  company_id: string;
  cnpj: string;
  status: CompanyStatus;
  created_at: Date;
  company_x_address: {
    address: {
      city: {
        name: string;
      };
    };
  }[];
  user: {
    nick_name: string;
  };
}
