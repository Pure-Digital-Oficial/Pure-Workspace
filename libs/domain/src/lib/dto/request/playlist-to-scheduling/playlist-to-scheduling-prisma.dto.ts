export interface PlaylistToSchedulingPrismaDto {
  created_at: Date;
  playlist: {
    playlist_id: string;
    created_at: Date;
    name: string;
    user: {
      nick_name: string;
    };
    category: {
      name: string;
    };
  };
}
