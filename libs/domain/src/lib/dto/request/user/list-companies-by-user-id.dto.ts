export interface ListCompaniesByUserIdDto {
  loggedUserId: string;
  userId: string;
  filter: string;
  take?: number;
  skip?: number;
}
