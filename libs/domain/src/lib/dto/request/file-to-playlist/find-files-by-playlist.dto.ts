export interface FindFilesByPlaylistDto {
  idPlaylist: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
