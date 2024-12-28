export interface FindToPlaylistPrismaDto {
  playlist_id: string;
  created_at: Date;
  Content_Files: {
    Content_Files_id: string;
    created_at: Date;
    file_name: string;
    original_name: string;
    path: string;
    size: string;
    format: string;
    user: {
      nick_name: string;
    };
  };
}
