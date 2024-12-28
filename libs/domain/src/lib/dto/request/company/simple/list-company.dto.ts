export interface ListCompanyDto {
  filter: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
