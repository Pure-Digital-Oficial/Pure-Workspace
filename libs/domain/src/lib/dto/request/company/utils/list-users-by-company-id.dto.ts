export interface ListUsersByCompanyIdDto {
  filter: string;
  companyId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
