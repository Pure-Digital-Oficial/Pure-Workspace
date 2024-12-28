export interface AddPlaylistsToSchedulingDto {
  schedulingId: string;
  playlistIds: string[];
  loggedUserId: string;
}
