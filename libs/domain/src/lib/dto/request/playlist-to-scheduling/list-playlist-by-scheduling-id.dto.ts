export interface ListPlaylistBySchedulingIdDto {
  id: string;
  loggedUserId: string;
  filter: string;
  take?: number;
  skip?: number;
}
