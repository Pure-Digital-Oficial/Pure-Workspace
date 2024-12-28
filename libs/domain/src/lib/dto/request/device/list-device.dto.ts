export interface ListDeviceDto {
  filter: string;
  companyId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
