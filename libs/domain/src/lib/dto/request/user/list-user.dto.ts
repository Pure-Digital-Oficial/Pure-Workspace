export interface ListUserDto {
  filter: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
