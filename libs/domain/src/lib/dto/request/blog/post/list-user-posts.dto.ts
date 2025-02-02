export interface ListUserPostsDto {
  filter: string;
  loggedUserId: string;
  appId: string;
  take?: number;
  skip?: number;
}
