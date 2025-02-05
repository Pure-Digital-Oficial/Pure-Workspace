export interface ListMediasPostDto {
  loggedUserId: string;
  postId: string;
  filter: string;
  take?: number;
  skip?: number;
}
