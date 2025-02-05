export interface ListPostsDto {
  filter: string;
  appId: string;
  take?: number;
  skip?: number;
}
