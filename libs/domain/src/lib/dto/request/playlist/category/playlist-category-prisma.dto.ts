export interface PlaylistCategoryPrismaDto {
  name: string;
  created_at: Date;
  user: {
    nick_name: string;
  };
  playlist_category_id: string;
  description: string;
}
