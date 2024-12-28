export interface MoveFilesToAnotherPlaylistDto {
  filesId: string[];
  oldPlaylistId: string;
  newPlaylistId: string;
  loggedUserId: string;
}
