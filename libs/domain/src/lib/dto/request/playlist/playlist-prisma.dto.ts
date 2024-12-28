export interface PlaylistPrismaDto {
  playlist_id: string;
  name: string;
  created_at: Date;
  user: {
    nick_name: string;
  };
  category: {
    name: string;
  };
}
