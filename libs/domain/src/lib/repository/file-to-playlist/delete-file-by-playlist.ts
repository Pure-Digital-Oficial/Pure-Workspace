export interface DeleteFileByPlaylistRepository {
  delete(idPlaylist: string): Promise<void>;
}
