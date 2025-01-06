export interface ListPostsDto {
  filter: string;
  appId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
