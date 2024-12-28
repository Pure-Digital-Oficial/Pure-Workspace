export interface ListSchedulesDto {
  filter: string;
  companyId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
