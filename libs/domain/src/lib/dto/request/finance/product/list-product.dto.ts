export interface ListProductDto {
  filter: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
